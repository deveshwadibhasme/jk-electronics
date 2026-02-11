// EComHeader.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add Link for navigation
import { useCart } from "../Context/CartContext"; // Add cart context
import "../../Style/EComHeader.css";
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";

const EComHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalCartItems } = useCart(); // Get cart count function
  const cartCount = getTotalCartItems(); // Get actual cart count

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Add your search logic here
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="navbar-exact">
      {/* Top Flash Sale Bar */}
      {/* <div className="flash-sale-bar">
          <div className="flash-content">
            <span className="flash-off">🔥Flash Sale: Up to</span>
            <span className="flash-off">50% OFF</span>
          </div>
        </div> */}

      {/* Main Navbar Container */}
      <div className="navbar-main">
        {/* Left: Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <div className="main-logo">JK-AUTOELECTRONIC WORK</div>
            <div className="logo-subtitle">
              <span className="tagline">Premium Auto Excellence</span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar with Blue Search Button */}
        <div className="search-section-exact">
          <div className="search-wrapper">
            <form className="search-container-exact" onSubmit={handleSearch}>
              <button className="search-button-q" type="button">
                <span className="q-text">
                  <IoIosSearch className="search-left-icon" />
                </span>
              </button>
              <input
                type="text"
                className="search-input-exact"
                placeholder="Search 15,000+ auto parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-submit-btn">
                <MdSearch className="search-icon" />
                <span className="search-btn-text">Search</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right: Icons Section */}
        <div className="icons-section">
          <div className="icon-wrapper">
            {/* Login/Account Icon */}
            <button
              className="icon-btn"
              aria-label="Login"
              onClick={() => navigate("/login")}
            >
              <div className="cart-btn-container">
                <FiUser className="icon-svg" />
              </div>
              <span className="icon-text">Login</span>
            </button>

            {/* Basket/Cart Icon - Now clickable with Link */}
            <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
              <div className="cart-btn-container">
                <div className="cart-icon-wrapper">
                  <MdOutlineShoppingCart className="icon-svg" />
                  {/* Display actual cart count */}
                  <span className="cart-count">{cartCount}</span>
                </div>
              </div>
              <span className="icon-text">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EComHeader;
