import axios from "axios";
import { adminStorage } from "./adminStorage";

const baseURL = "https://jk-automobile-9xtf.onrender.com/api";

export const adminApi = axios.create({
  baseURL,
  timeout: 15000,
});

adminApi.interceptors.request.use((config) => {
  const token = adminStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminService = {
  async login(payload) {
    const { data } = await adminApi.post("/auth/login/admin", payload);
    return data;
  },
  async getUsers() {
    const { data } = await adminApi.get("/admin/users");
    return data;
  },
  async toggleUserBlock(userId) {
    const { data } = await adminApi.put(`/admin/users/block/${userId}`);
    return data;
  },
  async getBlockedUsers() {
    const { data } = await adminApi.get("/admin/users/blocked");
    return data;
  },
  async getOrders() {
    const { data } = await adminApi.get("/admin/order/listing");
    return data;
  },
  async updateOrderStatus(orderId, status) {
    const { data } = await adminApi.put("/admin/order/update-status", {
      orderId,
      status,
    });
    return data;
  },
  async uploadProduct(formData) {
    const { data } = await adminApi.post("/admin/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
};
