import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CartProvider } from "./Context/CartContext";
import EcomHeader from "./Pages/EcomHeader"; // Fixed case
import EcomHerosection from "./Pages/EcomHerosection";
import EcomProductDetail from "./Pages/EcomProductDetail";
import EcomChoose from "./Pages/EcomChoose";
import EcomCustomerreview from "./Pages/EcomCustomerreview";
import EcomFooter from "./Pages/EcomFooter";
import EcomOffer from "./Pages/EcomOffer";
import CartPage from "./Pages/CartPage";
import LogInPage from "./Pages/LogInPage";
import RegistrationPage from "./Pages/SignupPage";
import { AuthProvider } from "./context/AuthContext";

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
