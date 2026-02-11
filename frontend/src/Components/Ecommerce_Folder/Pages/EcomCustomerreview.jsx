// EcomCustomerreview.jsx
import React from 'react';
import '../../Style/EcomCustomerreview.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      rating: "''",
      stars: 5,
      reviewText: "The TNM7000 turbo kit completely transformed my car's performance. The installation was straightforward and the results exceeded my expectations. Highly recommended!",
      customerName: "Michael Rodriguez",
      customerRole: "Professional Racer"
    },
    {
      id: 2,
      rating: "''",
      stars: 5,
      reviewText: "Best automotive parts store I've dealt with. Quality products, fast shipping, and exceptional customer service. The LED headlights I bought are absolutely brilliant!",
      customerName: "Sarah Chen",
      customerRole: "Car Enthusiast"
    },
    {
      id: 3,
      rating: "''",
      stars: 5,
      reviewText: "We've been ordering from AutoParts Pro for years. Their products are top-notch and their prices are competitive. Our go-to supplier for all performance parts.",
      customerName: "James Thompson",
      customerRole: "Mechanic Shop Owner"
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar key={index} className="star-icon" />
    ));
  };

  return (
    <div className="customer-reviews-container">
      <div className="reviews-header">
        <h1 className="main-title">What Our Customers Say</h1>
        <p className="subtitle">Join thousands of satisfied customers who trust AutoParts Pro</p>
      </div>
      
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="rating-display">{review.rating}</div>
            
            <div className="stars-section">
              {renderStars(review.stars)}
            </div>
            
            <div className="review-content">
              <p className="review-text">"{review.reviewText}"</p>
              <div className="customer-info">
                <h3 className="customer-name">{review.customerName}</h3>
                <p className="customer-role">{review.customerRole}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;