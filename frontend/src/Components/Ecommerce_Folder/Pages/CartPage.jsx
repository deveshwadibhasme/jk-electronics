// CartPage.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import "../../Style/CartPage.css";
import PaymentButton from "../components/PaymentButton";
import product from "../../../assets/tnm.jpeg";
const CartPage = () => {
  // const {
  //   cartItems,
  //   removeFromCart,
  //   updateQuantity,
  //   clearCart,
  //   getTotalPrice,
  // } = useCart();

  const location = useLocation();

  const cartItems = location.state;

  if (!cartItems) {
    return (
      <div className="cart-container empty-cart">
        <div className="empty-cart-content">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart ({cartItems.length} items)</h1>
        {/* <button onClick={clearCart} className="clear-cart-btn">
          Clear Cart
        </button> */}
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.price} className="cart-item">
              <img src={product} alt={item.title} className="cart-item-image" />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">{item.price}</p>
              </div>

              {/* <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-change-btn"
                >
                  <FaMinus />
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-change-btn"
                >
                  <FaPlus />
                </button>
              </div> */}

              <div className="cart-item-total">
                Rs {item.price}
                {/* {(
                  parseFloat(item.price.replace("$", "").replace(",", "")) *
                  item.quantity
                ).toFixed(2)} */}
              </div>

              {/* <button
                onClick={() => removeFromCart(item.id)}
                className="remove-item-btn"
                title="Remove from cart"
              >
                <FaTrash />
              </button> */}
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            {/* <span>
              Subtotal (
              {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
              items)
            </span> */}
            <span>Rs {cartItems[0].price}</span>
            {/* <span>${getTotalPrice()}</span> */}
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span className="total-price">Rs {cartItems[0].price}</span>
            {/* <span className="total-price">${getTotalPrice()}</span> */}
          </div>

          <PaymentButton amount={cartItems[0].price} product={cartItems} />

          <Link to="/" className="continue-shopping-link">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
