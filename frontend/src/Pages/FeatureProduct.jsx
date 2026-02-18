// FeatureProduct.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext"; // Add cart context
import "../Style/FeatureProduct.css";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import TNM7000Image from "../../../Images/NEW7000_1-1000x1000-1100x1100 (1).jpg";

const FeatureProduct = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Get addToCart function

  // Array of product data for 8 cards with complete details
  const products = [
    {
      id: 1,
      title: "TNM7000 ECU kit offers TCM programming capabilities",
      rating: "⭐⭐⭐⭐☆",
      reviews: 342,
      price: "$16,664",
      oldPrice: "$17,000",
      save: "Save $336",
      badge: "25% OFF",
      imageUrl: TNM7000Image,
      category: "Engine Parts",
      description:
        "Premium high-flow air filter designed to increase horsepower and torque. Features washable and reusable design with lifetime warranty.",
      features: [
        "Increases horsepower by up to 15 HP",
        "Washable and reusable design",
        "Lifetime warranty included",
        "Easy 15-minute installation",
        "Fits most modern vehicles",
      ],
      specifications: {
        Material: "Oiled Cotton Gauze",
        "Filter Type": "Performance",
        Reusable: "Yes",
        Warranty: "Lifetime",
        "Installation Time": "15 minutes",
      },
      images: ["NEW7000_1-1000x1000-1100x1100 (1).jpg"],
    },
    {
      id: 2,
      title: "Premium Alloy Wheel Set - 18 inch Forged",
      rating: "⭐⭐⭐⭐⭐",
      reviews: 128,
      price: "$1,899",
      oldPrice: "$2,499",
      save: "Save $600",
      badge: "24% OFF",
      imageUrl:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=350&fit=crop",
      category: "Wheels & Tires",
      description:
        "Lightweight forged alloy wheels for superior performance and style.",
      features: [
        "Forged construction for strength",
        "20% lighter than cast wheels",
        "Includes center caps and mounting hardware",
      ],
      specifications: {
        Size: "18x8 inches",
        Material: "Forged Aluminum",
        Finish: "Matte Black",
      },
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 3,
      title: "LED Headlight Assembly - Ultra Bright 6000K",
      rating: "⭐⭐⭐⭐☆",
      reviews: 256,
      price: "$549",
      oldPrice: "$699",
      save: "Save $150",
      badge: "NEW",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=350&fit=crop",
      category: "Lighting",
      description: "Ultra bright LED headlights with 6000K color temperature.",
      features: [
        "6000K pure white light",
        "Plug and play installation",
        "Energy efficient",
      ],
      specifications: {
        "Color Temperature": "6000K",
        Power: "30W",
        Lifetime: "50,000 hours",
      },
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 4,
      title: "Carbon Fiber Interior Trim Kit - Premium Quality",
      rating: "⭐⭐⭐⭐⭐",
      reviews: 89,
      price: "$799",
      oldPrice: "$999",
      save: "Save $200",
      badge: "LIMITED",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=350&fit=crop",
      category: "Interior",
      description: "Premium carbon fiber interior trim kit.",
      features: ["Real carbon fiber", "Precision fit", "Easy installation"],
      specifications: {
        Material: "Carbon Fiber",
        Fit: "Custom",
        Finish: "Gloss",
      },
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 5,
      title: "Performance Brake Kit - Drilled & Slotted Rotors",
      rating: "⭐⭐⭐⭐⭐",
      reviews: 167,
      price: "$449",
      oldPrice: "$599",
      save: "Save $150",
      badge: "30% OFF",
      imageUrl:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=350&fit=crop",
      category: "Brakes",
      description: "High-performance brake kit with drilled & slotted rotors.",
      features: [
        "Drilled & slotted rotors",
        "Improved heat dissipation",
        "Reduced brake fade",
      ],
      specifications: {
        "Rotor Type": "Drilled & Slotted",
        Material: "Cast Iron",
        Coating: "Zinc Plated",
      },
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 6,
      title: "Sports Exhaust System - Deep Tone Stainless Steel",
      rating: "⭐⭐⭐⭐☆",
      reviews: 213,
      price: "$899",
      oldPrice: "$1,199",
      save: "Save $300",
      badge: "TOP RATED",
      imageUrl:
        "https://images.unsplash.com/photo-1627560116075-1c7c850d6e8c?w=500&h=350&fit=crop",
      category: "Exhaust",
      description: "Sports exhaust system with deep tone.",
      features: [
        "Stainless steel construction",
        "Deep aggressive tone",
        "Performance gains",
      ],
      specifications: {
        Material: "Stainless Steel",
        "Tip Style": "Dual Round",
        Diameter: "3 inches",
      },
      images: [
        "https://images.unsplash.com/photo-1627560116075-1c7c850d6e8c?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 7,
      title: "Adjustable Coilover Suspension Kit - Racing Edition",
      rating: "⭐⭐⭐⭐⭐",
      reviews: 94,
      price: "$1,299",
      oldPrice: "$1,599",
      save: "Save $300",
      badge: "PERFORMANCE",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=350&fit=crop",
      category: "Suspension",
      description: "Adjustable coilover suspension kit for racing.",
      features: [
        "Height adjustable",
        "32-way damping",
        "Spring preload adjustable",
      ],
      specifications: {
        Adjustment: "Height & Damping",
        "Spring Rate": "8kg/mm",
        Material: "Aluminum",
      },
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 8,
      title: "Leather Seat Covers - Premium Grade Custom Fit",
      rating: "⭐⭐⭐⭐☆",
      reviews: 301,
      price: "$399",
      oldPrice: "$499",
      save: "Save $100",
      badge: "POPULAR",
      imageUrl:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=350&fit=crop",
      category: "Interior",
      description: "Premium leather seat covers with custom fit.",
      features: ["Premium leather", "Custom fit", "Easy installation"],
      specifications: {
        Material: "Genuine Leather",
        Color: "Black",
        Fit: "Custom",
      },
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop",
      ],
    },
  ];

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleEyeClick = (e, productId) => {
    e.stopPropagation();
    handleProductClick(productId);
  };

  // Updated: Add to cart with actual functionality
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);

    // Show success message
    const alertMessage = document.createElement("div");
    alertMessage.className = "cart-success-message";
    alertMessage.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      ">
        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${product.title.substring(0, 40)}... added to cart!</span>
      </div>
    `;
    document.body.appendChild(alertMessage);

    // Remove message after 3 seconds
    setTimeout(() => {
      alertMessage.remove();
    }, 3000);
  };

  return (
    <div className="feature-products-container">
      <h1 className="feature-products-title">Featured Products</h1>
      <p className="feature-products-subtitle">
        Upgrade your vehicle with our premium selection
      </p>

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="card"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="image-wrapper">
              <span className="badge">{product.badge}</span>

              {/* Left side icons */}
              <div className="image-icons">
                <button
                  className="icon-btn eye-btn"
                  title="Quick View"
                  onClick={(e) => handleEyeClick(e, product.id)}
                >
                  <FaEye />
                </button>
                <button
                  className="icon-btn wishlist-btn"
                  title="Add to Wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Added ${product.title} to wishlist!`);
                  }}
                >
                  <FaHeart />
                </button>
              </div>

              <img
                src={product.imageUrl}
                alt={product.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/500x350/3b82f6/ffffff?text=Product+Image";
                }}
              />
            </div>

            <div className="content">
              <h3 className="title">{product.title}</h3>

              <div className="rating">
                <span className="stars">{product.rating}</span>
                <span className="reviews">({product.reviews})</span>
              </div>

              <div className="price-row">
                <span className="price">{product.price}</span>
                {product.oldPrice && (
                  <>
                    <span className="old-price">{product.oldPrice}</span>
                    <span className="save">{product.save}</span>
                  </>
                )}
              </div>

              <button
                className="btn"
                onClick={(e) => handleAddToCart(e, product)}
              >
                <FaShoppingCart className="cart-icon" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add CSS for success message animation */}
      <style jsx="true">{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FeatureProduct;
