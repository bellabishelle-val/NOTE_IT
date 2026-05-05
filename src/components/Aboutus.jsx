import React from "react";
import "../css/Aboutus.css";

const Aboutus = () => {
  return (
    <div className="aboutus-container">
      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="container text-center">
          <h1 className="aboutus-title">
            What Our Customers Say
          </h1>
          <p className="aboutus-subtitle">
            Hear from our happy customers who have experienced the quality and 
            creativity of Note IT products.
          </p>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <img
                    src="images/section3-1.webp"
                    alt="Journal"
                    className="img-fluid"
                  />
                </div>
                <div className="testimonial-content">
                  <h3 className="testimonial-title">
                    Amazing Quality!
                  </h3>
                  <p className="testimonial-text">
                    I love the quality of the journals I purchased. They are
                    perfect for my daily writings.
                  </p>
                  <div className="testimonial-rating">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <img
                    src="images/section3-2.webp"
                    alt="Stationery"
                    className="img-fluid"
                  />
                </div>
                <div className="testimonial-content">
                  <h3 className="testimonial-title">
                    Highly Recommended!
                  </h3>
                  <p className="testimonial-text">
                    The stationery items have changed my note-taking experience. I
                    highly recommend Note IT!
                  </p>
                  <div className="testimonial-rating">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <section className="additional-content">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <img
                    src="images/section3-3.webp"
                    alt="Products"
                    className="img-fluid"
                  />
                </div>
                <div className="testimonial-content">
                  <h3 className="testimonial-title">
                    A Creative Haven!
                  </h3>
                  <p className="testimonial-text">
                    Note IT is my go-to for all things creative. Their products
                    inspire me every day.
                  </p>
                  <div className="testimonial-rating">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="quote-section">
                <img 
                  src="images/space.jpg" 
                  alt="Book quote" 
                  className="img-fluid rounded-3 shadow-lg"
                />
                <blockquote className="testimonial-quote">
                  "Creativity is intelligence having fun."
                  <cite>- Albert Einstein</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Ways Section */}
      <section className="creative-ways-section">
        <div className="container text-center">
          <h2 className="section-title">
            Creative Ways to Use Our Products
          </h2>
          <p className="section-subtitle">
            Explore the versatility of our notebooks and stationery through
            inspiring displays.
          </p>
        </div>
        
        <div className="container">
          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-6">
              <img 
                src="images/show1.webp" 
                alt="Year planner" 
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
            <div className="col-lg-6">
              <div className="content-card">
                <h3 className="content-title">
                  Mini Notebooks for Every Occasion
                </h3>
                <p className="content-description">
                  Compact and stylish, our mini notebooks are your ideal companion
                  for quick notes or sketches. Perfect for on-the-go creativity, they
                  fit effortlessly into any bag, ensuring you're always prepared to
                  jot down your ideas.
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-6 order-lg-2">
              <img 
                src="images/show2.webp" 
                alt="Mini notebook" 
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="content-card">
                <h3 className="content-title">
                  Stationery Essentials for Every Student
                </h3>
                <p className="content-description">
                  From highlighters to bookmarks, our stationery products enhance your
                  study sessions. Bright colors and functional designs make learning
                  enjoyable and help you stay organized.
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img 
                src="images/show3.webp" 
                alt="Creative journal" 
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
            <div className="col-lg-6">
              <div className="content-card">
                <h3 className="content-title">
                  Elegant Journals in Action
                </h3>
                <p className="content-description">
                  Our elegantly designed journals are perfect for capturing thoughts,
                  dreams, and daily reflections. Whether on a cozy café table or a
                  sunlit park bench, these journals elevate your writing experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stories Section */}
      <section className="community-stories-section">
        <div className="container text-center">
          <h2 className="section-title">
            Real Stories from Our Community
          </h2>
          <p className="section-subtitle">
            Discover how our products fit seamlessly into the lives of our valued
            customers.
          </p>
        </div>
        
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="story-card">
                <img 
                  src="images/showcar1.webp" 
                  alt="Story 1" 
                  className="img-fluid rounded-3 mb-3"
                />
                <div className="story-content">
                  <h4 className="story-title">Stationery That Inspires Me</h4>
                  <p className="story-date">January 29, 2026</p>
                  <p className="story-excerpt">
                    In a world filled with distractions, my stationery from Note IT helps me focus. 
                    The vibrant colors and quality materials make every writing session a joy...
                  </p>
                  <button className="story-link">Read More...</button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="story-card">
                <img 
                  src="images/showcar2.webp" 
                  alt="Story 2" 
                  className="img-fluid rounded-3 mb-3"
                />
                <div className="story-content">
                  <h4 className="story-title">Mini Notebooks: My Travel Companion</h4>
                  <p className="story-date">January 29, 2026</p>
                  <p className="story-excerpt">
                    Traveling can be chaotic, but my mini notebook keeps me grounded. 
                    I jot down experiences, memories, and ideas wherever I go...
                  </p>
                  <button className="story-link">Read More...</button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="story-card">
                <img 
                  src="images/showcar3.webp" 
                  alt="Story 3" 
                  className="img-fluid rounded-3 mb-3"
                />
                <div className="story-content">
                  <h4 className="story-title">My Journey with Note IT Journals</h4>
                  <p className="story-date">January 29, 2026</p>
                  <p className="story-excerpt">
                    As a writer, my Note IT journal has become a sanctuary for my thoughts. 
                    Every morning, I dedicate time to write and reflect...
                  </p>
                  <button className="story-link">Read More...</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
