const axios = require('axios');
const crypto = require('crypto');
const mpesaConfig = require('./mpesa_config');

class MpesaService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Generate OAuth token
  async getAccessToken() {
    try {
      // Check if token is still valid
      if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      const auth = Buffer.from(`${mpesaConfig.consumerKey}:${mpesaConfig.consumerSecret}`).toString('base64');
      
      const response = await axios.post(
        `${mpesaConfig.baseUrl}${mpesaConfig.oauthUrl}`,
        {},
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );

      this.accessToken = response.data.access_token;
      // Token expires in 1 hour
      this.tokenExpiry = Date.now() + (3600 * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting M-PESA access token:', error);
      throw new Error('Failed to authenticate with M-PESA');
    }
  }

  // Generate password for STK push
  generatePassword(timestamp) {
    const data = `${mpesaConfig.shortcode}${mpesaConfig.passkey}${timestamp}`;
    return crypto.createHash('sha256').update(data).digest('base64');
  }

  // Send STK push to user's phone
  async initiateStkPush(phone, amount, accountReference) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').replace(/\..+/, '');
      const password = this.generatePassword(timestamp);

      // Format phone number (remove 254 if present, add 254)
      const formattedPhone = phone.startsWith('254') ? phone : `254${phone}`;
      
      const stkPushRequest = {
        BusinessShortCode: mpesaConfig.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: mpesaConfig.shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: mpesaConfig.callbackUrl,
        AccountReference: accountReference,
        TransactionDesc: `Payment for ${accountReference}`,
        TransactionDesc: 'NOTE_IT Premium Payment'
      };

      console.log('STK Push Request:', stkPushRequest);

      const response = await axios.post(
        `${mpesaConfig.baseUrl}${mpesaConfig.stkUrl}`,
        stkPushRequest,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('STK Push error:', error.response?.data || error.message);
      throw new Error('Failed to initiate M-PESA payment');
    }
  }

  // Process payment callback from M-PESA
  processCallback(callbackData) {
    try {
      const { Body } = callbackData;
      const { stkCallback } = Body;
      
      const resultCode = stkCallback.ResultCode;
      const resultDesc = stkCallback.ResultDesc;
      
      let paymentStatus = 'failed';
      let message = 'Payment failed';
      
      if (resultCode === '0') {
        paymentStatus = 'completed';
        message = 'Payment successful';
      } else if (resultCode === '1032') {
        paymentStatus = 'failed';
        message = 'Request cancelled by user';
      } else if (resultCode === '1037') {
        paymentStatus = 'failed';
        message = 'Insufficient funds';
      } else {
        message = `Payment failed: ${resultDesc}`;
      }

      return {
        success: resultCode === '0',
        status: paymentStatus,
        message: message,
        merchantRequestID: stkCallback.MerchantRequestID,
        checkoutRequestID: stkCallback.CheckoutRequestID,
        mpesaReceiptNumber: stkCallback.MpesaReceiptNumber,
        transactionDate: stkCallback.TransactionDate,
        amount: stkCallback.Amount,
        phoneNumber: stkCallback.PhoneNumber
      };
    } catch (error) {
      console.error('Callback processing error:', error);
      return {
        success: false,
        status: 'failed',
        message: 'Error processing payment callback'
      };
    }
  }
}

module.exports = MpesaService;
