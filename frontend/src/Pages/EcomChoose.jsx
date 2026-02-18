// EcomChoose.jsx
import React from "react";
import "../Style/EcomChoose.css";
import {
  FaTruck,
  FaWrench,
  FaShieldAlt,
  FaChartLine,
  FaHeadset,
  FaAward,
  FaCreditCard,
  FaRocket,
} from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      id: 1,
      icon: <FaTruck />,
      title: "Free Shipping",
      description: "On orders over $500, fast delivery nationwide.",
    },
    {
      id: 2,
      icon: <FaWrench />,
      title: "Easy Installation",
      description: "Detailed guides and video tutorials included.",
    },
    {
      id: 3,
      icon: <FaShieldAlt />,
      title: "Quality Guarantee",
      description: "All products tested and certified for excellence.",
    },
    {
      id: 4,
      icon: <FaChartLine />,
      title: "Performance Tested",
      description: "Proven results on track and street.",
    },
    {
      id: 5,
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Expert mechanics ready to help anytime.",
    },
    {
      id: 6,
      icon: <FaAward />,
      title: "Best Brands",
      description: "Retrieved with top automotive manufacturers.",
    },
    {
      id: 7,
      icon: <FaCreditCard />,
      title: "Secure Payment",
      description: "Multiple payment options, 100% secure checkout.",
    },
    {
      id: 8,
      icon: <FaRocket />,
      title: "Quick Delivery",
      description: "Most items ship within 24 hours.",
    },
  ];

  return (
    <div className="why-choose-container">
      <div className="why-choose-header">
        <h1 className="main-title">Why Choose AutoParts Pro?</h1>
        <p className="subtitle">
          Excellence in every aspect of automotive parts retail
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-content">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
