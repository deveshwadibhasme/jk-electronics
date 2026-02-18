// CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('autoPartsCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('autoPartsCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total cart items
  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl || "https://via.placeholder.com/100x100/3b82f6/ffffff?text=Product",
            quantity: quantity
          }
        ];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Extract numeric price from string like "$299" or "$1,899"
      const priceStr = item.price.replace('$', '').replace(',', '');
      const price = parseFloat(priceStr) || 0;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalCartItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};