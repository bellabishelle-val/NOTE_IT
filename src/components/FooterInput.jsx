import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../css/FooterInput.css';

const FooterInput = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);

  const getToken = () => localStorage.getItem('authToken');
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  });

  const API_BASE = 'https://varli.alwaysdata.net/api';

  // Fetch messages from database
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_footer_messages`, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Load messages on component mount
  React.useEffect(() => {
    if (user?.id) {
      fetchMessages();
    }
  }, [user?.id]);

  const submitMessage = async () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/save_footer_message`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          message: message,
          user_id: user.id
        })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('');
        
        // Show success feedback
        const successMessage = document.createElement('div');
        successMessage.className = 'success-toast';
        successMessage.textContent = '✨ Message sent successfully!';
        successMessage.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          z-index: 1000;
          animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.style.animation = 'slideOut 0.3s ease';
          setTimeout(() => document.body.removeChild(successMessage), 300);
        }, 2000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="footer-input-container">
      <div className="input-header">
        <h2 className="page-title">📝 Share Your Thoughts</h2>
        <p className="page-subtitle">Leave a message for the community</p>
      </div>

      <div className="input-form">
        <div className="input-group">
          <label className="input-label">Your Message:</label>
          <textarea
            className="message-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts, feedback, or ideas..."
            rows={4}
            maxLength={500}
          />
          <div className="char-count">{message.length}/500</div>
        </div>

        <button
          className="submit-btn"
          onClick={submitMessage}
          disabled={isSubmitting || !message.trim()}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            <>
              <span className="submit-icon">📤</span>
              Send Message
            </>
          )}
        </button>
      </div>

      <div className="recent-messages">
        <h3 className="messages-title">Recent Messages</h3>
        <div className="messages-list">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="message-item">
                <div className="message-content">
                  <p>{msg.message}</p>
                  <small className="message-time">
                    {new Date(msg.created_at).toLocaleDateString()} {new Date(msg.created_at).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <div className="no-messages">
              <p>No messages yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FooterInput;
