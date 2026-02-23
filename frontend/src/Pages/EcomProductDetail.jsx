// EcomProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";
import "../Style/EcomProductDetail.css";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const EcomProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Get addToCart function

  // // Sample product data
  const allProducts = [
    {
      id: 1,
      title: "High-Performance Air Filter Kit - Maximum Airflow",
      rating: 4,
      reviews: 342,
      price: "$299",
      oldPrice: "$399",
      save: "Save $100",
      badge: "25% OFF",
      imageUrl:
        "https://images.unsplash.com/photo-1627560116075-1c7c850d6e8c?w=500&h=350&fit=crop",
      category: "Engine Parts",
      description:
        "Premium high-flow air filter designed to increase horsepower and torque. Features washable and reusable design with lifetime warranty.",
      detailedDescription:
        "This performance air filter kit is engineered to deliver maximum airflow while maintaining excellent filtration efficiency. The washable and reusable design saves you money in the long run, and the lifetime warranty ensures your satisfaction.",
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
      images: [
        "https://images.unsplash.com/photo-1627560116075-1c7c850d6e8c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 2,
      title: "Premium Alloy Wheel Set - 18 inch Forged",
      rating: 5,
      reviews: 128,
      price: "$1,899",
      oldPrice: "$2,499",
      save: "Save $600",
      badge: "24% OFF",
      imageUrl:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=350&fit=crop",
      category: "Wheels & Tires",
      description:
        "Lightweight forged alloy wheels for superior performance and style. CNC machined from high-grade aluminum alloy.",
      detailedDescription:
        "CNC machined from high-grade aluminum alloy, these wheels offer superior strength and reduced weight for improved performance.",
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
      rating: 4,
      reviews: 256,
      price: "$549",
      oldPrice: "$699",
      save: "Save $150",
      badge: "NEW",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=350&fit=crop",
      category: "Lighting",
      description:
        "Ultra bright LED headlights with 6000K color temperature for superior visibility.",
      detailedDescription:
        "These LED headlights provide crystal clear illumination with a 6000K pure white light, improving nighttime visibility and safety.",
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
      rating: 4,
      reviews: 89,
      price: "$799",
      oldPrice: "$999",
      save: "Save $200",
      badge: "LIMITED",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=350&fit=crop",
      category: "Interior",
      description:
        "Premium carbon fiber interior trim kit for a sporty and luxurious look.",
      detailedDescription:
        "Made from real carbon fiber, this interior trim kit adds a sporty and premium look to your vehicle's cabin.",
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
      rating: 4,
      reviews: 167,
      price: "$449",
      oldPrice: "$599",
      save: "Save $150",
      badge: "30% OFF",
      imageUrl:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=350&fit=crop",
      category: "Brakes",
      description:
        "High-performance brake kit with drilled & slotted rotors for improved stopping power.",
      detailedDescription:
        "This brake kit features drilled and slotted rotors that improve heat dissipation and reduce brake fade during aggressive driving.",
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
      rating: 4,
      reviews: 213,
      price: "$899",
      oldPrice: "$1,199",
      save: "Save $300",
      badge: "TOP RATED",
      imageUrl:
        "https://images.unsplash.com/photo-1627560116075-1c7c850d6e8c?w=500&h=350&fit=crop",
      category: "Exhaust",
      description:
        "Sports exhaust system with deep tone for improved performance and sound.",
      detailedDescription:
        "This stainless steel exhaust system provides a deep, aggressive tone while improving exhaust flow for better performance.",
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
      rating: 4,
      reviews: 94,
      price: "$1,299",
      oldPrice: "$1,599",
      save: "Save $300",
      badge: "PERFORMANCE",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=350&fit=crop",
      category: "Suspension",
      description:
        "Adjustable coilover suspension kit for racing and performance driving.",
      detailedDescription:
        "This coilover suspension kit allows you to adjust both ride height and damping for optimal performance on both street and track.",
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
      rating: 4,
      reviews: 301,
      price: "$399",
      oldPrice: "$499",
      save: "Save $100",
      badge: "POPULAR",
      imageUrl:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=350&fit=crop",
      category: "Interior",
      description:
        "Premium leather seat covers with custom fit for comfort and style.",
      detailedDescription:
        "Made from premium grade leather, these seat covers provide both comfort and style while protecting your original seats.",
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

  useEffect(() => {
    // Find the product by ID
    const foundProduct = allProducts.find((p) => p.id === parseInt(id));

    if (foundProduct) {
      setProduct({
        ...foundProduct,
        rating: ratingNumber,
        discount: foundProduct.badge,
        inStock: true,
        stockCount: 15,
      });
    } else {
      console.error("Product not found for ID:", id);
    }

    setLoading(false);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  // Add to cart function with success message
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);

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
          <span>${quantity} x ${product.title.substring(
        0,
        40
      )}... added to cart!</span>
        </div>
      `;
      document.body.appendChild(alertMessage);

      // Remove message after 3 seconds
      setTimeout(() => {
        alertMessage.remove();
      }, 3000);
    }
  };

  // Buy Now function
  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);

      // Show success message
      const alertMessage = document.createElement("div");
      alertMessage.className = "cart-success-message";
      alertMessage.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #3b82f6;
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
          <span>Redirecting to checkout...</span>
        </div>
      `;
      document.body.appendChild(alertMessage);

      setTimeout(() => {
        alertMessage.remove();
        // Navigate to cart page (you can change this to checkout later)
        navigate("/cart");
      }, 1500);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="product-details-container">
        {/* <div className="breadcrumb">
          <button onClick={() => navigate(-1)} className="back-btn">
            <FaChevronLeft /> Back to Products
          </button>
        </div> */}
        {/* <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>The requested product could not be found.</p>
          <button onClick={() => navigate('/')} className="btn-back-home">
            Go Back Home
          </button>
        </div> */}
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="breadcrumb">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaChevronLeft /> Back to Products
        </button>
        <span>
          Home / Products / {product.category} /{" "}
          {product.title.substring(0, 30)}...
        </span>
      </div>

      <div className="product-main">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <button className="nav-btn prev-btn" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="featured-image"
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src =
              //     // "https://via.placeholder.com/800x600/3b82f6/?text=Product+Image";
              // }}
            />
            <button className="nav-btn next-btn" onClick={nextImage}>
              <FaChevronRight />
            </button>
            <span className="image-badge">{product.discount}</span>
          </div>

          <div className="thumbnail-images">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} view ${index + 1}`}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <span className="category">{product.category}</span>
            <h1 className="product-title-main">{product.title}</h1>

            <div className="rating-section">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`star ${
                      i < Math.floor(product.rating) ? "filled" : ""
                    }`}
                  />
                ))}
                <span className="rating-value">{product.rating}/5</span>
              </div>
              <span className="reviews-count">({product.reviews} reviews)</span>
              <span className="stock-status in-stock">
                In Stock ({product.stockCount} available)
              </span>
            </div>
          </div>

          <div className="pricing-section">
            <div className="current-price">
              <span className="price">{product.price}</span>
              {product.oldPrice && (
                <span className="old-price">{product.oldPrice}</span>
              )}
              <span className="discount-badge">{product.discount}</span>
            </div>
            <p className="tax-info">
              Tax included. Shipping calculated at checkout.
            </p>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
            <p>{product.detailedDescription}</p>
          </div>

          <div className="features-section">
            <h3>Key Features</h3>
            <ul className="features-list">
              {product.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-check">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="actions-section">
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decrementQuantity}>
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                className="quantity-input"
              />
              <button className="quantity-btn" onClick={incrementQuantity}>
                +
              </button>
            </div>

            <div className="action-buttons">
              <button className="btn-add-to-cart" onClick={handleAddToCart}>
                <FaShoppingCart /> Add to Cart
              </button>
              <button className="btn-buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="btn-wishlist">
                <FaHeart /> Add to Wishlist
              </button>
            </div>
          </div>

          {/* Shipping & Services */}
          <div className="services-section">
            <div className="service-item">
              <FaTruck className="service-icon" />
              <div>
                <h4>Free Shipping</h4>
                <p>Free shipping on orders over $100</p>
              </div>
            </div>
            <div className="service-item">
              <FaShieldAlt className="service-icon" />
              <div>
                <h4>2-Year Warranty</h4>
                <p>Manufacturer warranty included</p>
              </div>
            </div>
            <div className="service-item">
              <FaUndo className="service-icon" />
              <div>
                <h4>30-Day Returns</h4>
                <p>Easy returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button className="tab active">Specifications</button>
          <button className="tab">Reviews ({product.reviews})</button>
          <button className="tab">Installation Guide</button>
          <button className="tab">FAQ</button>
        </div>

        <div className="tab-content">
          <div className="specifications-grid">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-key">{key}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
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

export default EcomProductDetails;
