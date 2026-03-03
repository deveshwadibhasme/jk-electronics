import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminService } from "../lib/adminApi";
import { adminStorage } from "../lib/adminStorage";

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const currency = (amount) => {
  const value = Number(amount || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
};

const OrderStatusBadge = ({ status }) => {
  const map = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    shipped: "bg-violet-50 text-violet-700 border-violet-200",
    delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
        map[status] || "bg-slate-50 text-slate-700 border-slate-200"
      }`}
    >
      {status || "unknown"}
    </span>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <header className="mb-4">
    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
  </header>
);

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyOrderId, setBusyOrderId] = useState(null);
  const [busyUserId, setBusyUserId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadForm, setUploadForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const loadDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const [ordersData, usersData, blockedData] = await Promise.all([
        adminService.getOrders(),
        adminService.getUsers(),
        adminService.getBlockedUsers(),
      ]);
      setOrders(ordersData);
      setUsers(usersData);
      setBlockedUsers(blockedData);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load dashboard data right now."
      );
      if (err.response?.status === 401 || err.response?.status === 403) {
        adminStorage.clearToken();
        navigate("/admin/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3200);
    return () => clearTimeout(timer);
  }, [message]);

  const filteredOrders = useMemo(() => {
    const key = query.trim().toLowerCase();
    if (!key) return orders;
    return orders.filter((order) => {
      return [
        order.id,
        order.user_name,
        order.user_email,
        order.user_number,
        order.shipping_address,
        order.status,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(key));
    });
  }, [orders, query]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  }, [orders]);

  const handleOrderStatusChange = async (orderId, status) => {
    setBusyOrderId(orderId);
    setError("");
    try {
      await adminService.updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status } : order))
      );
      setMessage("Order status updated.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update order status. Try again."
      );
    } finally {
      setBusyOrderId(null);
    }
  };

  const handleToggleUser = async (userId) => {
    setBusyUserId(userId);
    setError("");
    try {
      await adminService.toggleUserBlock(userId);
      const [usersData, blockedData] = await Promise.all([
        adminService.getUsers(),
        adminService.getBlockedUsers(),
      ]);
      setUsers(usersData);
      setBlockedUsers(blockedData);
      setMessage("User status updated.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user status.");
    } finally {
      setBusyUserId(null);
    }
  };

  const handleUploadChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setUploadForm((prev) => ({ ...prev, image: files?.[0] || null }));
      return;
    }
    setUploadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();
    if (!uploadForm.image) {
      setError("Please select an image before uploading.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", uploadForm.name);
      formData.append("price", uploadForm.price);
      formData.append("description", uploadForm.description);
      formData.append("image", uploadForm.image);
      await adminService.uploadProduct(formData);
      setUploadForm({ name: "", price: "", description: "", image: null });
      setMessage("Product uploaded successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please retry.");
    } finally {
      setUploading(false);
    }
  };

  const logout = () => {
    adminStorage.clearToken();
    navigate("/admin/login", { replace: true });
  };

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-white p-6 shadow-panel">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-admin-700">
              Admin Panel
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage orders, user accounts, and product uploads from one screen.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Logout
          </button>
        </header>

        {message ? (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-panel">
            <p className="text-sm text-slate-500">Total Orders</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{orders.length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-panel">
            <p className="text-sm text-slate-500">Users</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{users.length}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-panel">
            <p className="text-sm text-slate-500">Blocked Users</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {blockedUsers.length}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-panel">
            <p className="text-sm text-slate-500">Revenue</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {currency(totalRevenue)}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <article className="rounded-2xl bg-white p-6 shadow-panel">
            <SectionHeader
              title="Order Management"
              subtitle="Search and update statuses in real-time."
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by order ID, customer, phone, status, address..."
              className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-admin-400 focus:ring-2 focus:ring-admin-100"
            />

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-3">Order ID</th>
                    <th className="px-3 py-3">Customer</th>
                    <th className="px-3 py-3">Phone</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Address</th>
                    <th className="px-3 py-3">Payment</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="px-3 py-6 text-slate-500" colSpan={8}>
                        Loading orders...
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td className="px-3 py-6 text-slate-500" colSpan={8}>
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="border-t border-slate-100 align-top">
                        <td className="px-3 py-3 font-semibold text-slate-900">#{order.id}</td>
                        <td className="px-3 py-3">
                          <p className="font-medium text-slate-900">{order.user_name}</p>
                          <p className="text-xs text-slate-500">{order.user_email}</p>
                        </td>
                        <td className="px-3 py-3 text-slate-600">{order.user_number}</td>
                        <td className="px-3 py-3 font-semibold text-slate-900">
                          {currency(order.total_amount)}
                        </td>
                        <td className="px-3 py-3 text-slate-600">{order.shipping_address}</td>
                        <td className="px-3 py-3 text-slate-600 capitalize">
                          {order.payment_status || "N/A"}
                        </td>
                        <td className="px-3 py-3">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="px-3 py-3">
                          <select
                            value={order.status || "pending"}
                            disabled={busyOrderId === order.id}
                            onChange={(event) =>
                              handleOrderStatusChange(order.id, event.target.value)
                            }
                            className="rounded-md border border-slate-300 px-2 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-admin-400 focus:ring-2 focus:ring-admin-100 disabled:cursor-not-allowed"
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <div className="grid gap-6 xl:grid-cols-2">
            <article className="rounded-2xl bg-white p-6 shadow-panel">
              <SectionHeader
                title="Users"
                subtitle="Toggle account blocking from this table."
              />
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-3">Name</th>
                      <th className="px-3 py-3">Email</th>
                      <th className="px-3 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td className="px-3 py-6 text-slate-500" colSpan={3}>
                          Loading users...
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td className="px-3 py-6 text-slate-500" colSpan={3}>
                          No users available.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="border-t border-slate-100">
                          <td className="px-3 py-3 font-medium text-slate-900">
                            {user.name}
                          </td>
                          <td className="px-3 py-3 text-slate-600">{user.email}</td>
                          <td className="px-3 py-3">
                            <button
                              type="button"
                              disabled={busyUserId === user.id}
                              onClick={() => handleToggleUser(user.id)}
                              className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {user.isBlock ? "Unblock" : "Block"}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-panel">
              <SectionHeader
                title="Blocked Users"
                subtitle="Quick view of currently blocked accounts."
              />
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-3">Name</th>
                      <th className="px-3 py-3">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td className="px-3 py-6 text-slate-500" colSpan={2}>
                          Loading blocked users...
                        </td>
                      </tr>
                    ) : blockedUsers.length === 0 ? (
                      <tr>
                        <td className="px-3 py-6 text-slate-500" colSpan={2}>
                          No blocked users.
                        </td>
                      </tr>
                    ) : (
                      blockedUsers.map((user) => (
                        <tr key={user.id} className="border-t border-slate-100">
                          <td className="px-3 py-3 font-medium text-slate-900">
                            {user.name}
                          </td>
                          <td className="px-3 py-3 text-slate-600">{user.email}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          <article className="rounded-2xl bg-white p-6 shadow-panel">
            <SectionHeader
              title="Product Upload"
              subtitle="Add product data and image to backend."
            />
            <form
              onSubmit={handleUploadSubmit}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <input
                type="text"
                name="name"
                value={uploadForm.name}
                onChange={handleUploadChange}
                placeholder="Product name"
                required
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-admin-400 focus:ring-2 focus:ring-admin-100"
              />
              <input
                type="number"
                name="price"
                value={uploadForm.price}
                onChange={handleUploadChange}
                placeholder="Price"
                required
                min="0"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-admin-400 focus:ring-2 focus:ring-admin-100"
              />
              <input
                type="text"
                name="description"
                value={uploadForm.description}
                onChange={handleUploadChange}
                placeholder="Description"
                required
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-admin-400 focus:ring-2 focus:ring-admin-100"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleUploadChange}
                required
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-admin-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-admin-800"
              />
              <div className="sm:col-span-2 lg:col-span-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="rounded-lg bg-admin-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-admin-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? "Uploading..." : "Upload Product"}
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
