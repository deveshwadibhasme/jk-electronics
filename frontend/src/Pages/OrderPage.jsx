import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const LOCAL_URL = "http://localhost:3000";
  const PUBLIC_URL = "https://jk-auto.onrender.com";
  const url = window.location.hostname === "localhost" ? LOCAL_URL : PUBLIC_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/order/my-order`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        // Convert object response to array if necessary
        const data = response.data;
        const ordersArray = Array.isArray(data)
          ? data
          : Object.values(data).filter(
              (item) => typeof item === "object" && item !== null
            );
        setOrders(ordersArray);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token, url]);

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="order-page-container">
      <h1>My Orders</h1>
      {orders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders?.map((order) => (
            <div key={order.order_id || order._id} className="order-card">
              <div className="order-header">
                <span>Order ID: {order.razorpay_order_id}</span>
                <span>Status: {order.order_status}</span>
              </div>
              <div className="order-details">
                <p>Amount: ₹{order.total_amount}</p>
                <p>Payment: {order.payment_status}</p>
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
