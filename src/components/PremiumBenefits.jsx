import React from 'react';
import { Link } from 'react-router-dom';
import '../css/PremiumBenefits.css';

const PremiumBenefits = () => {
  const features = [
    {
      icon: '📝',
      title: 'Smart To-Do Lists',
      description: 'Organize your daily tasks with priority levels, due dates, and progress tracking',
      premium: true
    },
    {
      icon: '📔',
      title: 'Digital Journal',
      description: 'Private journal with mood tracking, tags, and beautiful themes',
      premium: true
    },
    {
      icon: '💪',
      title: 'Motivation Cards',
      description: 'Daily inspiration with personalized quotes and achievement badges',
      premium: true
    },
    {
      icon: '🎯',
      title: 'Goal Tracker',
      description: 'Set and track long-term goals with milestone celebrations',
      premium: true
    },
    {
      icon: '📊',
      title: 'Personal Dashboard',
      description: 'Comprehensive overview of your productivity and progress',
      premium: true
    },
    {
      icon: '🎨',
      title: 'Custom Themes',
      description: 'Personalize your experience with exclusive themes and layouts',
      premium: true
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Student',
      content: 'The journal feature has transformed my daily routine. I feel more organized and motivated!',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Entrepreneur',
      content: 'The goal tracker and to-do lists keep me focused on what matters most. Worth every penny!',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Creative Writer',
      content: 'Love the motivation cards! They give me the daily boost I need to stay creative.',
      rating: 5
    }
  ];

  const pricing = [
    {
      name: 'Free',
      price: '$0',
      features: ['Basic shopping', 'Wishlist', 'Product browsing'],
      highlighted: false
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      features: [
        'All Free features',
        'Smart To-Do Lists',
        'Digital Journal',
        'Motivation Cards',
        'Goal Tracker',
        'Personal Dashboard',
        'Custom Themes',
        'Priority Support'
      ],
      highlighted: true
    },
    {
      name: 'Lifetime',
      price: '$99',
      period: 'one-time',
      features: [
        'All Premium features',
        'Lifetime access',
        'All future updates',
        'VIP Support',
        'Exclusive content'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="premium-benefits">
      {/* Hero Section */}
      <section className="premium-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="hero-title">Unlock Your Full Potential</h1>
                <p className="hero-subtitle">
                  Transform your daily routine with premium productivity tools designed for modern life
                </p>
                <div className="hero-buttons">
                  <Link to="/signin" className="btn btn-primary premium-btn">
                    Start Free Trial
                  </Link>
                  <Link to="/signup" className="btn btn-outline-light premium-btn-outline">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-illustration">
                <div className="floating-cards">
                  <div className="card-1">📝</div>
                  <div className="card-2">📔</div>
                  <div className="card-3">💪</div>
                  <div className="card-4">🎯</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Premium Features</h2>
            <p className="section-subtitle">Everything you need to stay organized and motivated</p>
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  {feature.premium && (
                    <span className="premium-badge">Premium</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Choose Your Plan</h2>
            <p className="section-subtitle">Start with a free trial, upgrade anytime</p>
          </div>
          <div className="row g-4 justify-content-center">
            {pricing.map((plan, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
                  <div className="pricing-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-price">
                      <span className="price">{plan.price}</span>
                      {plan.period && <span className="period">{plan.period}</span>}
                    </div>
                  </div>
                  <div className="pricing-body">
                    <ul className="feature-list">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <span className="check-icon">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pricing-footer">
                    <Link 
                      to={plan.name === 'Free' ? '/signup' : `/mpesa-payment?plan=${plan.name.toLowerCase()}`} 
                      className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                    >
                      {plan.name === 'Free' ? 'Get Started' : plan.name === 'Lifetime' ? 'Get Lifetime' : 'Start Trial'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">Join thousands of satisfied users</p>
          </div>
          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="testimonial-card">
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                  <p className="testimonial-content">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <h5 className="author-name">{testimonial.name}</h5>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <div className="creative-elements">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <div className="sparkles">
              <span className="sparkle sparkle-1">✨</span>
              <span className="sparkle sparkle-2">⭐</span>
              <span className="sparkle sparkle-3">💫</span>
              <span className="sparkle sparkle-4">🌟</span>
            </div>
          </div>
          
          <h2 className="cta-title">🚀 Elevate Your Productivity Journey</h2>
          <p className="cta-subtitle">Transform the way you organize, track, and achieve your goals with premium features</p>
          
          <div className="plan-choices">
            <div className="choice-card premium-choice">
              <div className="choice-icon">👑</div>
              <h3 className="choice-title">Premium Monthly</h3>
              <p className="choice-desc">Full access • Monthly billing</p>
              <Link to="/mpesa-payment" state={{ plan: 'premium' }} className="choice-btn premium-btn">
                Choose Premium
              </Link>
            </div>
            
            <div className="choice-card lifetime-choice">
              <div className="choice-icon">🌟</div>
              <h3 className="choice-title">Lifetime Access</h3>
              <p className="choice-desc">One-time payment • Forever yours</p>
              <Link to="/mpesa-payment" state={{ plan: 'lifetime' }} className="choice-btn lifetime-btn">
                Choose Lifetime
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumBenefits;
