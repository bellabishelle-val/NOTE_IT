// M-PESA Configuration
const mpesaConfig = {
  // Safaricom API credentials (replace with your actual credentials)
  consumerKey: process.env.MPESA_CONSUMER_KEY || 'your_consumer_key_here',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || 'your_consumer_secret_here',
  shortcode: process.env.MPESA_SHORTCODE || '174379', // Your Paybill/Till number
  passkey: process.env.MPESA_PASSKEY || 'your_passkey_here',
  
  // Environment
  environment: process.env.NODE_ENV || 'sandbox', // 'sandbox' or 'production'
  
  // API URLs
  baseUrl: process.env.MPESA_ENV === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke',
  
  oauthUrl: '/oauth/v1/generate?grant_type=client_credentials',
  stkUrl: '/mpesa/stkpush/v1/processrequest',
  
  // Callback URL (where M-PESA sends payment results)
  callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://yourdomain.com/api/mpesa/callback',
  
  // Transaction timeout
  timeout: '30'
};

module.exports = mpesaConfig;
