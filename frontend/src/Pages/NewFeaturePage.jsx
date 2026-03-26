import React, { useState } from "react";
import "../Style/NewFeaturePage.css";
import ProductImg1 from "../Images/NEW7000_1-1000x1000-1100x1100 (1).jpg";
import ProductImg2 from "../Images/Untitled-1.jpg";
import { Link, useNavigate } from "react-router-dom";
// Add more images as needed

const NewFeaturePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of product images
  const productImages = [
    { src: ProductImg1, alt: "TNM7000 Programmer Front View" },
    { src: ProductImg2, alt: "TNM7000 Programmer Side View" },
    // Add more images here
  ];

  const automotiveFeatures = [
    "ECU Tuning & Remapping",
    "2D/3D Views with Auto Checksum",
    "Indian Vehicle Support (Maruti, Tata, Mahindra)",
    "ECU Cloning",
    "Immo Off (Immobilizer Unlocking)",
    "DPF/EGR Solutions",
    "Airbag Dashboard Programming",
    "JTAG, ISP, BDM, GPT Support",
    "OBD2 Cable Downloads",
  ];

  const universalFeatures = [
    "25,000+ Devices: Flash (NOR/NAND/SPI)",
    "EEPROM, MCUs, CPLDs, eMMCs",
    "48-pin ZIF Socket",
    "Pin Continuity Tester",
    "10-pin ISP/JTAG Connector",
    "USB 2.0 High-Speed (12MB/sec)",
    "Auto Detection of Flash/MCUs",
    "Built-in Digital IC Tester",
  ];

  const softwareFeatures = [
    "No Subscription Fee - Free Updates",
    "CAN Bus Analyzer Software",
    "8-Channel Logic Analyzer",
    "Windows XP/7/8/10/11 (32/64-bit)",
  ];

  const whatsIncluded = [
    "TNM7000 Programmer Unit",
    "OBD2 Cable",
    "JTAG/BDM/ISP PCB Board",
    "37+ Adapters (TSOP, SOP, PLCC)",
    "USB Cable & DC Power Supply",
  ];

  const stats = [
    { value: "25,000+", label: "Devices Supported" },
    { value: "5-in-1", label: "Programmer Types" },
    { value: "FREE", label: "Lifetime Updates" },
    { value: "37+", label: "Adapters Included" },
  ];

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate("/cart", {
      state: [
        { id: "87548", title: "TNM7000", price: "1,25,000", quantity: 1 },
      ],
    });
  };

  return (
    <div className="tnm7000-page">
      {/* Hero Section */}
      <div className="hero-wrapper">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="product-box">
                <div className="product-badge">
                  <span>High Speed Universal Programmer</span>
                </div>

                {/* Carousel Container */}
                <div className="carousel-container">
                  <div className="carousel-slides">
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        className={`carousel-slide ${
                          index === currentSlide ? "active" : ""
                        }`}
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="product-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/400x400/2c3e50/ffffff?text=TNM7000";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="bg-green-800 inline-block rounded-3xl font-sans font-bold text-white hover:bg-green-600"
                    style={{
                      padding: "10px",
                      paddingInline: "35px",
                      fontSize: "15px",
                      marginTop: "5px",
                    }}
                    onClick={handleBuyNowClick}
                  >
                    Buy Now
                  </button>
                  {/* Navigation Arrows */}
                  {productImages.length > 1 && (
                    <>
                      <button
                        className="carousel-arrow prev"
                        onClick={prevSlide}
                      >
                        ❮
                      </button>
                      <button
                        className="carousel-arrow next"
                        onClick={nextSlide}
                      >
                        ❯
                      </button>
                    </>
                  )}
                </div>

                {/* Dots Navigation */}
                {productImages.length > 1 && (
                  <div className="carousel-dots">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        className={`carousel-dot ${
                          index === currentSlide ? "active" : ""
                        }`}
                        onClick={() => goToSlide(index)}
                      />
                    ))}
                  </div>
                )}

                <div className="led-lights">
                  <div className="led power"></div>
                  <div className="led busy"></div>
                </div>
              </div>
            </div>
            <div className="hero-right">
              <h1 className="hero-title">
                TNM7000 <span className="highlight">ECU-KIT</span>
              </h1>
              <p className="hero-subtitle">
                Professional 5-in-1 ECU/OBD/ISP/JTAG/BDM/GPT Programmer
              </p>

              {/* Description Text */}
              <div className="description-text">
                <p className="description-main">
                  High-Speed Universal Programmer specialized for the Indian
                  automotive market with support for Maruti Suzuki, Tata, and
                  Mahindra vehicles. Supporting 25,000+ devices with no
                  subscription fees.
                </p>
              </div>

              <div className="features-tagline">
                <div className="tagline-item">
                  <span className="tagline-icon">▶</span>
                  <span>25,000+ Devices Supported</span>
                </div>
                <div className="tagline-item">
                  <span className="tagline-icon">▶</span>
                  <span>5-in-1 Programmer Types</span>
                </div>
                <div className="tagline-item">
                  <span className="tagline-icon">▶</span>
                  <span>FREE Lifetime Updates</span>
                </div>
                <div className="tagline-item">
                  <span className="tagline-icon">▶</span>
                  <span>37+ Adapters Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-wrapper">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-wrapper">
        <div className="container">
          <div className="features-grid">
            {/* Automotive & ECU Features */}
            <div className="feature-block">
              <div className="feature-header">
                <h2 className="feature-title">Automotive & ECU Features</h2>
              </div>
              <div className="feature-list">
                {automotiveFeatures.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="checkmark">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Universal Programmer */}
            <div className="feature-block">
              <div className="feature-header">
                <h2 className="feature-title">Universal Programmer</h2>
              </div>
              <div className="feature-list">
                {universalFeatures.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="checkmark">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Software & Features */}
            <div className="feature-block">
              <div className="feature-header">
                <h2 className="feature-title">Software & Package</h2>
              </div>
              <div className="feature-list">
                {softwareFeatures.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="checkmark">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="software-tools">
                <span className="tool-tag">📊 CAN Bus Analyzer</span>
                <span className="tool-tag">📈 8-Channel Logic Analyzer</span>
              </div>
            </div>

            {/* Package Includes */}
            <div className="feature-block">
              <div className="feature-header">
                <h2 className="feature-title">Package Includes</h2>
              </div>
              <div className="feature-list">
                {whatsIncluded.map((item, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="bullet">●</span>
                    <span className="feature-text">{item}</span>
                  </div>
                ))}
              </div>
              <div className="cable-note">
                <span>🔌 Includes OBD2 Cable, USB Cable & DC Power Supply</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Section */}
      <div className="professional-wrapper">
        <div className="container">
          <div className="professional-card">
            <div className="professional-badge">⭐ For Professionals Only</div>
            <p className="professional-text">
              Available through specialized automotive tools suppliers in
              Varanasi, Gujarat, and major automotive hubs across India
            </p>
            <div className="professional-footer">
              Complete solution for automotive diagnostics and universal device
              programming
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-wrapper">
        <div className="container">
          <div className="footer-text">
            <span>
              TNM7000 • High-Speed Universal Programmer • 25,000+ Devices
              Supported
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFeaturePage;
