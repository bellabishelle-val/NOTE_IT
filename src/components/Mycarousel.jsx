import React from 'react'

const Mycarousel = () => {
  return (
    <div>
        <section className="row">
  <div id="carouselExampleCaptions" className="carousel slide">
    
    <div className="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>

    <div className="carousel-inner">
      
      <div className="carousel-item active">
        <center>
          <img
            src="images/carousel1.jpg"
            alt="carousel"
            height="800px"
            width="70%"
          />
        </center>
        <div className="carousel-caption d-none d-md-block">
          <h5 className="display-2 text-danger">
            Featured Journal of the Month
          </h5>
          <p style={{ fontSize: "x-large", textTransform: "uppercase" }}>
            Discover our beautifully designed journal that encourages daily reflection and creativity. Perfect for capturing your thoughts and ideas.
          </p>
        </div>
      </div>

      <div className="carousel-item">
        <center>
          <img
            src="images/carousel2.jpg"
            alt="carousel2"
            height="800px"
            width="70%"
          />
        </center>
        <div className="carousel-caption d-none d-md-block">
          <h5 className="display-2 text-danger">
            Mini Notebook Collection
          </h5>
          <p style={{ fontSize: "x-large", textTransform: "uppercase" }}>
            Introducing our new range of mini notebooks, ideal for on-the-go note-taking. Compact, stylish, and ready to accompany you anywhere.
          </p>
        </div>
      </div>

      <div className="carousel-item">
        <center>
          <img
            src="images/carousel3.jpg"
            alt="carousel3"
            height="800px"
            width="70%"
          />
        </center>
        <div className="carousel-caption d-none d-md-block">
          <h5 className="display-2 text-danger">
            Exclusive Stationery Sets
          </h5>
          <p style={{ fontSize: "x-large", textTransform: "uppercase" }}>
            Elevate your writing experience with our exclusive stationery sets. Perfect for gifting or personal use, these sets combine elegance and utility.
          </p>
        </div>
      </div>

    </div>

    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon bg-success" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>

    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon bg-success" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>

  </div>
</section>
    </div>
  )
}

export default Mycarousel