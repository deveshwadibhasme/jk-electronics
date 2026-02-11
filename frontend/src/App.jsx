import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CartProvider } from "./Components/Ecommerce_Folder/Context/CartContext";
import EcomHeader from "./Components/Ecommerce_Folder/Pages/EcomHeader"; // Fixed case
import EcomHerosection from "./Components/Ecommerce_Folder/Pages/EcomHerosection";
import FeatureProduct from "./Components/Ecommerce_Folder/Pages/FeatureProduct";
import EcomProductDetail from "./Components/Ecommerce_Folder/Pages/EcomProductDetail";
import EcomChoose from "./Components/Ecommerce_Folder/Pages/EcomChoose";
import EcomCustomerreview from "./Components/Ecommerce_Folder/Pages/EcomCustomerreview";
import EcomFooter from "./Components/Ecommerce_Folder/Pages/EcomFooter";
import EcomOffer from "./Components/Ecommerce_Folder/Pages/EcomOffer";
import CartPage from "./Components/Ecommerce_Folder/Pages/CartPage"; // Added missing import
import LogInPage from "./Components/Ecommerce_Folder/Pages/LogInPage";
import RegistrationPage from "./Components/Ecommerce_Folder/Pages/SignupPage";
import { AuthProvider } from "./Components/Ecommerce_Folder/context/AuthContext";

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
