import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/MpesaPayment.css';

const MpesaPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get plan type from URL query parameters
  const urlParams = new URLSearchParams(location.search);
  const plan = urlParams.get('plan') || 'premium';
  
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Plan-specific configurations
  const planConfigs = {
    premium: {
      title: "Premium Plan",
      description: "Unlock all premium features including smart to-do lists, digital journal, motivation cards, goal tracker, personal dashboard, and custom themes.",
      image: "/images/premium-plan.jpg",
      price: "Ksh 999/month",
      features: [
        "✨ Smart To-Do Lists",
        "📝 Digital Journal",
        "💪 Motivation Cards",
        "🎯 Goal Tracker",
        "📊 Personal Dashboard",
        "🎨 Custom Themes"
      ]
    },
    lifetime: {
      title: "Lifetime Access",
      description: "One-time payment for lifetime access to all premium features. No recurring charges, unlimited access forever.",
      image: "/images/lifetime-plan.jpg",
      price: "Ksh 9,999",
      features: [
        "🌟 All Premium Features Forever",
        "💰 One-Time Payment Only",
        "🚀 No Monthly Renewals",
        "🎁 Lifetime Support",
        "📱 All Future Updates"
      ]
    }
  };

  const currentPlan = planConfigs[plan] || planConfigs.premium;

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    setLoading("Processing your payment...");
    
    try {
      // Create form data for Mpesa API
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", plan === 'lifetime' ? '9999' : '999');
      formdata.append("plan", plan);
      formdata.append("user_id", user?.id || '');
      
      // Call Mpesa payment API
      const response = await axios.post("https://varli.alwaysdata.net/api/mpesa_payment", formdata);
      
      setLoading("");
      
      if (response.data.success) {
        setSuccess(`Payment successful! Your ${plan} plan is now active.`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(response.data.message || "Payment failed. Please try again.");
      }
      
    } catch (error) {
      setLoading("");
      setError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="mpesa-payment-container">
      <div className="payment-card">
        <div className="card-body">
          <h1>Complete Your {currentPlan.title}</h1>
          
          {/* Plan Information */}
          <div className="plan-info">
            <div className="plan-visual">
              <img 
                src={currentPlan.image} 
                alt={currentPlan.title}
                className="plan-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(currentPlan.title) + '&bg=6366f1&color=white';
                }}
              />
              <div className="plan-overlay">
                <h2 className="plan-title">{currentPlan.title}</h2>
                <div className="plan-price">{currentPlan.price}</div>
              </div>
            </div>
            
            <div className="plan-details">
              <h3 className="plan-subtitle">{currentPlan.description}</h3>
              
              <div className="features-list">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form-section">
            <h2 className="form-title">M-PESA Payment</h2>
            <p className="form-subtitle">Enter your M-PESA number to complete the purchase</p>
            
            <form onSubmit={handleSubmit} className="payment-form">
              {/* Status messages */}
              <div className="text-center mb-4">
                {loading && <div className="loading-message">{loading}</div>}
                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}
              </div>

              {/* Phone input */}
              <div className="input-group">
                <label className="input-label">M-PESA Number</label>
                <input
                  type="tel"
                  className="phone-input"
                  placeholder="254XXXXXXXXX"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  pattern="254[0-9]{9}[0-9]{8}"
                  maxLength={12}
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="payment-submit-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay ${currentPlan.price}`}
              </button>
            </form>

            <div className="security-info">
              <h4 className="security-title">🔒 Secure Payment</h4>
              <p className="security-text">Your payment information is encrypted and secure. We never store your M-PESA details.</p>
              <ul className="security-features">
                <li><span className="security-feature-text">🛡️ SSL Encrypted Transaction</span></li>
                <li><span className="security-feature-text">🔐 Secure API Integration</span></li>
                <li><span className="security-feature-text">⚡ Instant Activation</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MpesaPayment;
