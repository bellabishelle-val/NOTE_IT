import React from "react";

const Aboutus = () => {
  return (
    <div>

      {/* =================== Section: What our Customers Say =================== */}
      <div style={{ textAlign: "center" }}>
        <h2
          className="display-2"
          style={{
            fontVariant: "small-caps",
            textDecoration: "underline",
            fontSize: "600%",
          }}
        >
          What our Customers Say
        </h2>
        <p style={{ fontSize: "xx-large", color: "indianred" }}>
          Hear from our happy customers who have experienced the quality and
          creativity of Note IT products.
        </p>
      </div>

      {/* Customer Cards */}
      <section className="row">
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col">
            <div className="card">
              <img
                src="images/section3-1.webp"
                className="card-img-top"
                alt="journal"
              />
              <div className="card-body">
                <h5
                  className="card-title text-dark"
                  style={{ fontVariant: "small-caps", fontSize: "300%" }}
                >
                  Amazing Quality!
                </h5>
                <p className="card-text" style={{ fontSize: "200%" }}>
                  I love the quality of the journals I purchased. They are
                  perfect for my daily writings.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="images/section3-2.webp"
                className="card-img-top"
                alt="stationery"
              />
              <div className="card-body">
                <h5
                  className="card-title text-dark"
                  style={{ fontVariant: "small-caps", fontSize: "300%" }}
                >
                  Highly Recommended!
                </h5>
                <p className="card-text" style={{ fontSize: "200%" }}>
                  The stationery items have changed my note-taking experience. I
                  highly recommend Note IT!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />

      <section className="row" style={{ marginRight: "10px" }}>
        <div className="col-lg-6">
          <div className="card">
            <img
              src="images/section3-3.webp"
              className="card-img-top"
              alt="products"
            />
            <div className="card-body">
              <h5
                className="card-title text-dark"
                style={{ fontVariant: "small-caps", fontSize: "300%" }}
              >
                A Creative Haven!
              </h5>
              <p className="card-text" style={{ fontSize: "200%" }}>
                Note IT is my go-to for all things creative. Their products
                inspire me every day.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <img src="images/space.jpg" alt="book quote" width="70%" height="400px" />
        </div>
      </section>

      <br />
      <br />
      <hr />

      {/* =================== Section: Creative Ways to Use Our Products =================== */}
      <div style={{ textAlign: "center" }}>
        <h2
          className="display-2"
          style={{
            fontVariant: "small-caps",
            textDecoration: "underline wavy",
            color: "rgb(148, 34, 68)",
            fontSize: "500%",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Creative Ways to Use Our Products
        </h2>
        <br />
        <p className="display-6" style={{ color: "maroon" }}>
          Explore the versatility of our notebooks and stationery through
          inspiring displays.
        </p>
        <br />
      </div>

      {/* Product Showcases */}
      <section className="row" style={{ marginLeft: "300px", marginRight: "400px" }}>
        <div className="col-lg-5">
          <img src="images/show1.webp" alt="year planner" width="100%" height="600px" />
        </div>
        <div className="col-lg-5" style={{ textAlign: "justify" }}>
          <br />
          <br />
          <h4
            style={{
              fontSize: "450%",
              fontFamily: "serif",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            Mini Notebooks for Every Occasion
          </h4>
          <br />
          <p
            className="text-center bg-light"
            style={{ fontSize: "xx-large", color: "rgb(8, 85, 61)" }}
          >
            Compact and stylish, our mini notebooks are your ideal companion
            for quick notes or sketches. Perfect for on-the-go creativity, they
            fit effortlessly into any bag, ensuring you’re always prepared to
            jot down your ideas.
          </p>
        </div>
      </section>

      <br />
      <br />
      <br />
      <br />

      <section className="row" style={{ marginLeft: "300px", marginRight: "400px" }}>
        <div className="col-lg-5" style={{ textAlign: "justify" }}>
          <br />
          <br />
          <h4
            style={{
              fontSize: "450%",
              fontFamily: "serif",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            Stationery Essentials for Every Student
          </h4>
          <br />
          <p
            className="text-center bg-light"
            style={{ fontSize: "xx-large", color: "rgb(8, 85, 61)" }}
          >
            From highlighters to bookmarks, our stationery products enhance your
            study sessions. Bright colors and functional designs make learning
            enjoyable and help you stay organized, whether you’re at home or in
            the classroom.
          </p>
        </div>
        <div className="col-lg-5">
          <img src="images/show2.webp" alt="mini notebook" width="100%" height="600px" />
        </div>
      </section>

      <br />
      <br />
      <br />
      <br />

      <section className="row" style={{ marginLeft: "300px", marginRight: "400px" }}>
        <div className="col-lg-5">
          <img src="images/show3.webp" alt="creative journal" width="100%" height="600px" />
        </div>
        <div className="col-lg-5" style={{ textAlign: "justify" }}>
          <br />
          <br />
          <h4
            style={{
              fontSize: "450%",
              fontFamily: "serif",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            Elegant Journals in Action
          </h4>
          <br />
          <p
            className="text-center bg-light"
            style={{ fontSize: "xx-large", color: "rgb(8, 85, 61)" }}
          >
            Our elegantly designed journals are perfect for capturing thoughts,
            dreams, and daily reflections. Whether on a cozy café table or a
            sunlit park bench, these journals elevate your writing experience.
          </p>
        </div>
      </section>

      <br />
      <br />
      <hr />

      {/* =================== Section: Real Stories from Our Community =================== */}
      <div style={{ textAlign: "center" }}>
        <h2
          className="display-2"
          style={{
            fontVariant: "small-caps",
            fontSize: "400%",
            fontFamily:
              "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            color: "rgb(126, 42, 175)",
            textDecoration: "underline",
          }}
        >
          Real Stories from Our Community
        </h2>
        <br />
        <p style={{ fontSize: "xx-large", color: "rgb(230, 213, 68)" }}>
          Discover how our products fit seamlessly into the lives of our valued
          customers.
        </p>
        <br />
        <br />
        <br />
      </div>

      {/* Customer Stories */}
      <section className="row" style={{ marginLeft: "300px", marginRight: "400px" }}>
        <div className="col-lg-5">
          <img src="images/showcar1.webp" alt="year planner" width="100%" height="600px" />
        </div>
        <div className="col-lg-7" style={{ textAlign: "left" }}>
          <br />
          <br />
          <h4 className="text-success bg-light" style={{ fontSize: "250%" }}>
            Stationery That Inspires Me
          </h4>
          <br />
          <span className="text-danger" style={{ fontSize: "xx-large" }}>
            January 29, 2026
          </span>
          <br />
          <br />
          <p className="bg-success" style={{ fontSize: "180%", color: "rgb(2, 26, 13)" }}>
            In a world filled with distractions, my stationery from Note IT helps me focus. The
            vibrant...
          </p>
          <a href="#" style={{ fontSize: "xx-large" }}>
            Read More...
          </a>
        </div>
      </section>
      <hr />

      <section className="row" style={{ marginLeft: "300px", marginRight: "400px" }}>
        <div className="col-lg-5">
          <img src="images/showcar2.webp" alt="mini notebook" width="100%" height="600px" />
        </div>
        <div className="col-lg-7" style={{ textAlign: "left" }}>
          <br />
          <br />
          <h4 className="text-success bg-light" style={{ fontSize: "250%" }}>
            Mini Notebooks: My Travel Companion
          </h4>
          <br />
          <span className="text-danger" style={{ fontSize: "xx-large" }}>
            January 29, 2026
          </span>
          <br />
          <br />
          <p className="bg-success" style={{ fontSize: "xx-large", color: "rgb(2, 26, 13)" }}>
            Traveling can be chaotic, but my mini notebook keeps me grounded. I jot down experiences,...
          </p>
          <br />
          <a href="#" style={{ fontSize: "xx-large" }}>
            Read More...
          </a>
        </div>
      </section>
      <hr />

      <section className="row" style={{ marginLeft: "300px", marginRight: "400px" }}>
        <div className="col-lg-5">
          <img src="images/showcar3.webp" alt="creative journal" width="100%" height="600px" />
        </div>
        <div className="col-lg-7" style={{ textAlign: "justify" }}>
          <br />
          <br />
          <h4 className="text-success bg-light" style={{ fontSize: "250%" }}>
            My Journey with Note IT Journals
          </h4>
          <br />
          <span className="text-danger" style={{ fontSize: "xx-large" }}>
            January 29, 2026
          </span>
          <br />
          <br />
          <p className="bg-success" style={{ fontSize: "xx-large", color: "rgb(2, 26, 13)" }}>
            As a writer, my Note IT journal has become a sanctuary for my thoughts. Every morning, I dedicate...
          </p>
          <br />
          <a href="#" style={{ fontSize: "xx-large" }}>
            Read More...
          </a>
        </div>
      </section>
      <br />

    </div>
  );
};

export default Aboutus;