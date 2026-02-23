import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import EcomHeader from "./Pages/EComHeader.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import EcomHerosection from "./Pages/EComHerosection.jsx";
import EcomProductDetail from "./Pages/EcomProductDetail.jsx";
import EcomChoose from "./Pages/EcomChoose.jsx";
import EcomFooter from "./Pages/EcomFooter.jsx";
import EcomOffer from "./Pages/EcomOffer.jsx";
import CartPage from "./Pages/CartPage.jsx";
import LogInPage from "./Pages/LogInPage.jsx";
import RegistrationPage from "./Pages/SignupPage.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import OrderPage from "./Pages/OrderPage.jsx";

// Removed line 13: import { useCart } from './components/Ecommerce_Folder/Pages/EcomCart';

const HomePage = () => {
  return (
    <div className="home-page">
      <EcomHerosection />
      {/* <FeatureProduct /> */}
      <EcomProductDetail />
      <EcomChoose />
      {/* <EcomCustomerreview /> */}
      <EcomOffer />
      <EcomFooter />
    </div>
  );
};

// Create ProductPage component
const ProductPage = () => {
  // return <EcomProductDetail />;
};

const App = () => {
  return (
    // Wrap everything with CartProvider
    <CartProvider>
      <Router>
        <AuthProvider>
          <div className="app">
            {/* Header shows on all pages */}
            <EcomHeader />

            {/* Main content changes based on route */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/orders" element={<OrderPage />} />
                {/* Optional: 404 Page Route */}
                <Route
                  path="*"
                  element={
                    <div style={{ padding: "80px", textAlign: "center" }}>
                      <h2>404 - Page Not Found</h2>
                      <p>The page you're looking for doesn't exist.</p>
                    </div>
                  }
                />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </CartProvider>
  );
};

export default App;
