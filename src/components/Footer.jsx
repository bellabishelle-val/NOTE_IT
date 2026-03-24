import React from "react";

const Footer = () => {
  return (
    <>
      <section
        className="row"
        style={{ backgroundImage: "url(images/bgi.png)" }}
      >
        {/* Column 1 */}
        <div className="col-lg-4 p-4 text-white">
          <h3
            style={{
              fontVariant: "small-caps",
              fontSize: "250%",
              color: "sienna",
            }}
          >
            Introducing Our Back-to-School Sale!
          </h3>

          <p style={{ fontSize: "180%", color: "black" }}>
            Gear up for the new school year with our exciting back-to-school
            sale! Enjoy discounts on all notebooks and stationery items. Perfect
            for students and professionals alike, this is your chance to stock up
            on essential supplies. Don't miss out!
          </p>

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-danger"
              style={{ fontSize: "200%", fontVariant: "small-caps" }}
            >
              Shop the Sale
            </button>
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-lg-4 p-4 text-white">
          <h3
            className="text-center"
            style={{
              fontVariant: "small-caps",
              fontSize: "250%",
              color: "sienna",
            }}
          >
            Get in Touch
          </h3>

          <p style={{ fontSize: "180%", color: "black" }}>
            We’re here to assist you with any questions or concerns you may have.
            Reach out to us today!
          </p>

          <form>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              style={{ fontSize: "x-large" }}
            />
            <br />

            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
              style={{ fontSize: "x-large" }}
            />
            <br />

            <textarea
              cols="50"
              rows="3"
              className="form-control"
              placeholder="Leave a Comment"
              style={{ fontSize: "x-large" }}
            ></textarea>

            <br />

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-outline-primary"
                style={{ fontSize: "200%", fontVariant: "small-caps" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Column 3 */}
        <div className="col-lg-4 p-4 text-center">
          <h3
            style={{
              fontVariant: "small-caps",
              fontSize: "250%",
              color: "sienna",
            }}
          >
            Stay Connected
          </h3>

          <br />

          <a href="https://www.facebook.com">
            <img src="images/fb.png" alt="fb" width="140px" />
          </a>

          <br />
          <br />

          <a href="https://instagram.com">
            <img src="images/in.png" alt="ig" width="140px" />
          </a>

          <br />
          <br />

          <a href="https://twitter.com">
            <img src="images/x.png" alt="x" width="140px" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-white p-2 bg-dark">
        <b style={{ fontVariant: "small-caps", fontSize: "xx-large" }}>
          Developed by VALERIE M. © 2026 All rights reserved
        </b>
      </footer>
    </>
  );
};
console.log("Footer rendered");

export default Footer;