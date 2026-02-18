// EcomOffer.jsx
import React from "react";
import "../Style/EcomOffer.css";
import { MdElectricBolt } from "react-icons/md";

const EcomOffer = () => {
  // Changed from OfferBanner to EcomOffer
  return (
    <div className="offer-banner-container">
      {/* Background Image */}
      <div className="offer-background-image"></div>

      {/* Top Button - Limited Time Offer */}
      <button className="limited-time-btn">
        <MdElectricBolt className="bolt-icon" />
        <span>Limited Time Offer</span>
      </button>

      <div className="offer-content">
        <h1 className="offer-title">Up to 40% OFF</h1>
        <p className="offer-description">
          Get exclusive discounts on selected performance parts. Upgrade your
          <br />
          ride today!
        </p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
    </div>
  );
};

export default EcomOffer; // Changed from OfferBanner to EcomOffer
