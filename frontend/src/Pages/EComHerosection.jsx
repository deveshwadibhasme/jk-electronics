// EComHerosection.jsx
import React from "react";
import "../Style/EComHerosection.css";
import carimage from "../Images/car-sports-car-supercar-lamborghini-aventador-wallpaper-preview.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize navigate

  const heroStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${carimage}) center/cover no-repeat`,
    minHeight: "700px",
    padding: "100px 40px",
    color: "white",
    fontFamily: "'Arial', sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  // Function to handle Buy Now button click
  const handleBuyNowClick = () => {
    // Navigate to the first product's detail page (product ID: 1)
    // addToCart();
    navigate("/cart", {
      state: [
        { id: "87548", title: "TNM7000", price: "1,25,000", quantity: 1 },
      ],
    });
  };

  return (
    <div className="hero-section" style={heroStyle}>
      <div className="bottom-blur-overlay"></div>

      <div className="hero-container">
        {/* Left Content Section */}
        <div className="hero-left">
          {/* Badge */}
          {/* <div className="badge-container">
            <span className="badge">
              <MdElectricBolt className="bolt-icon" /> New Release 2026 -
              Limited Edition
            </span>
          </div> */}

          {/* Product Title */}
          <h1 className="product-title">TNM7000</h1>

          {/* Description */}
          <p className="product-description">
            The TNM7000 Kit is a powerful, all-in-one network testing solution
            delivering fast, precise, and reliable performance insights. Built
            for professionals, it makes network validation and troubleshooting
            smarter, simpler, and more efficient.
          </p>

          {/* Square Features Grid */}
          <div className="square-features-grid">
            <div className="square-feature">
              <div className="square-icon">⚡</div>
              <div className="square-content">
                <div className="square-number">+250 HP</div>
                <div className="square-label">Power Boost</div>
              </div>
            </div>
            <div className="square-feature">
              <div className="square-icon">🛡️</div>
              <div className="square-content">
                <div className="square-number">5 Years</div>
                <div className="square-label">Warranty</div>
              </div>
            </div>
          </div>

          {/* Attractive Star Rating */}
          {/* <div className="rating-section">
            <div className="rating-stars">
              <MdStar className="star-icon filled" />
              <MdStar className="star-icon filled" />
              <MdStar className="star-icon filled" />
              <MdStar className="star-icon filled" />
              <MdStarHalf className="star-icon filled" />
            </div>
            <div className="rating-info">
              <span className="rating-value">4.9</span>
              <span className="rating-total">/5.0</span>
              <span className="rating-reviews">(2,500+ reviews)</span>
            </div>
            <div className="rating-badge">Excellent</div>
          </div> */}

          {/* CTA Button - Updated with onClick handler */}
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-5">
            <button
              className="cta-button"
              onClick={handleBuyNowClick} // Add click handler
            >
              Buy Now
            </button>
            <Link
              className="cta-button md:ml-4 bg-green-700"
              style={{ backgroundColor: "green" }}
              to={"/tnm-info"}
              onClick={handleBuyNowClick} // Add click handler
            >
              More Info
            </Link>
          </div>
        </div>

        {/* Right Stats Section */}
        <div className="flex flex-col-reverse md:w-1/2 gap-10 items-center justify-center">
          <div className="mx-auto relative max-w-sm items-center justify-center">
            <img
              className="z-30 mix-blend-screen rounded-full"
              src="/tnm.jpg"
              alt=""
            />
          </div>
          <div className="stats-grid">
            <div className="stat-card ">
              <div className="stat-number">1K+</div>
              <div className="stat-title">Happy Clients</div>
              <div className="stat-subtitle">Worldwide</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-title">Expert Support</div>
              <div className="stat-subtitle">Always Available</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-title">Quality Assured</div>
              <div className="stat-subtitle">Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
