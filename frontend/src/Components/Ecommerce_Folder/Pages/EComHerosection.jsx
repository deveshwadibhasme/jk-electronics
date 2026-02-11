// EComHerosection.jsx
import React from "react";
import "../../Style/EComHerosection.css";
import { MdElectricBolt, MdStar, MdStarHalf } from "react-icons/md";
import carimage from "../../../Images/car-sports-car-supercar-lamborghini-aventador-wallpaper-preview.jpg";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

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
      state: [{ title: "TNM7000", price: 100000, quantity: 1 }],
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
          <div className="cta-section">
            <button
              className="cta-button"
              onClick={handleBuyNowClick} // Add click handler
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Right Stats Section */}
        <div className="hero-right">
          <div className="stats-grid">
            {/* <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-title">Premium Parts</div>
              <div className="stat-subtitle">In Stock</div>
            </div> */}

            <div className="stat-card">
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
