// EcomFooter.jsx
import React from "react";
import "../../Style/EcomFooter.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Stay Updated Section */}
      <section className="stay-updated">
        <div className="container">
          <div className="stay-updated-content">
            <h2>Stay Updated</h2>
            <p>
              Subscribe to get special offers, free giveaways, and exclusive
              deals.
            </p>
            <div className="subscribe-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="email-input"
              />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <h2 className="brand-title">AutoParts Pro</h2>
              <p
                className="brand-description"
                style={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "bold",
                  paddingBottom: "1px",
                  textDecoration: "underline",
                }}
              >
                Powerd by Resicode
              </p>
              <p className="brand-description">
                Your trusted source for premium automotive parts and
                accessories. Quality guarantees, performance delivered.
              </p>
              {/* Social Media Icons */}
              <div className="social-media">
                <h3 className="social-title">Follow Us</h3>
                <div className="social-icons">
                  <a href="#facebook" aria-label="Facebook">
                    <FaFacebook className="social-icon" />
                  </a>
                  <a href="#twitter" aria-label="Twitter">
                    <FaTwitter className="social-icon" />
                  </a>
                  <a href="#instagram" aria-label="Instagram">
                    <FaInstagram className="social-icon" />
                  </a>
                  <a href="#linkedin" aria-label="LinkedIn">
                    <FaLinkedin className="social-icon" />
                  </a>
                  <a href="#youtube" aria-label="YouTube">
                    <FaYoutube className="social-icon" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            {/* <div className="footer-section">
              <h3 className="section-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#shop">Shop</a></li>
                <li><a href="#guides">Installation Guides</a></li>
                <li><a href="#order">Task Order</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div> */}

            {/* Categories */}
            {/* <div className="footer-section">
              <h3 className="section-title">Categories</h3>
              <ul className="footer-links">
                <li><a href="#engine">Engine Parts</a></li>
                <li><a href="#performance">Performance Testing</a></li>
                <li><a href="#wheels">Wheels & Tires</a></li>
                <li><a href="#electric">Electrical Systems</a></li>
                <li><a href="#accessories">Interior Accessories</a></li>
                <li><a href="#exterior">Exterior Accessories</a></li>
                <li><a href="#tools">Tools & Equipment</a></li>
              </ul>
            </div> */}

            {/* Contact & Newsletter */}
            <div className="footer-section">
              <div className="contact-section">
                <h3 className="section-title">Contact Us</h3>
                <ul className="contact-info">
                  <li className="contact-item">
                    <span className="contact-icon">📞</span>
                    1-000-AUTO-PART
                  </li>
                  <li className="contact-item">
                    <span className="contact-icon">✉️</span>
                    support@autopartspace.com
                  </li>
                  <li className="contact-item">
                    <span className="contact-icon">📍</span>
                    ......
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                © 2026 AutoParts Pro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
