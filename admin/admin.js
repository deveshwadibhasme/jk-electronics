document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const uploadForm = document.getElementById('upload-form');
    const userList = document.getElementById('user-list');
    const blockedUserList = document.getElementById('blocked-user-list');

    const API_URL = 'https://jk-auto.onrender.com/api';

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_URL}/auth/login/admin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login.');
            }
        });
    }

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const users = await response.json();
                renderUsers(users);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const renderUsers = (users) => {
        if (userList) {
            userList.innerHTML = '';
            users.forEach(user => {
                const userRow = document.createElement('tr');
                userRow.innerHTML = `
                    <td class="py-2 px-4 border-b">${user.name}</td>
                    <td class="py-2 px-4 border-b">${user.email}</td>
                    <td class="py-2 px-4 border-b">
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onclick="blockUser('${user.id}')">Block/Unblock</button>
                    </td>
                `;
                userList.appendChild(userRow);
            });
        }
    };

    window.blockUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/admin/users/block/${userId}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                fetchUsers();
                fetchBlockedUsers();
            } else {
                alert('Failed to block user.');
            }
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const fetchBlockedUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/admin/users/blocked`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const blockedUsers = await response.json();
                renderBlockedUsers(blockedUsers);
            } else {
                console.error('Failed to fetch blocked users');
            }
        } catch (error) {
            console.error('Error fetching blocked users:', error);
        }
    };

    const renderBlockedUsers = (blockedUsers) => {
        if (blockedUserList) {
            blockedUserList.innerHTML = '';
            blockedUsers.forEach(user => {
                const userRow = document.createElement('tr');
                userRow.innerHTML = `
                    <td class="py-2 px-4 border-b">${user.name}</td>
                    <td class="py-2 px-4 border-b">${user.email}</td>
                `;
                blockedUserList.appendChild(userRow);
            });
        }
    };

    window.updateOrderStatus = async (orderId, status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/admin/order/update-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ orderId, status }),
            });

            if (response.ok) {
                alert('Order status updated successfully');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to update order status.');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('An error occurred while updating status.');
        }
    };

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/admin/order/listing`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const orders = await response.json();
                renderOrders(orders);
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const renderOrders = (orders) => {
        const orderList = document.getElementById('order-list');
        if (orderList) {
            orderList.innerHTML = '';
            orders.forEach(order => {
                const orderRow = document.createElement('tr');
                orderRow.innerHTML = `
                    <td class="py-2 px-4 border-b">${order.id}</td>
                    <td class="py-2 px-4 border-b">${order.user_number}</td>
                    <td class="py-2 px-4 border-b">${order.user_name}</td>
                    <td class="py-2 px-4 border-b">₹${order.total_amount}</td>
                    <td class="py-2 px-4 border-b">${order.shipping_address}</td>
                    <td class="py-2 px-4 border-b">${order.payment_status}</td>
                    <td class="py-2 px-4 border-b">
                        <select onchange="updateOrderStatus('${order.id}', this.value)" class="border rounded px-2 py-1">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </td>
                `;
                orderList.appendChild(orderRow);
            });
        }
    };

    if (window.location.pathname.endsWith('dashboard.html')) {
        fetchOrders();
    }



    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('name', document.getElementById('name').value);
            formData.append('image', document.getElementById('image').files[0]);
            formData.append('price', document.getElementById('price').value);
            formData.append('description', document.getElementById('description').value);

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/admin/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                });

                if (response.ok) {
                    alert('Data uploaded successfully!');
                    uploadForm.reset();
                } else {
                    alert('Failed to upload data.');
                }
            } catch (error) {
                console.error('Upload error:', error);
            }
        });
    }

    if (window.location.pathname.endsWith('dashboard.html')) {
        fetchUsers();
        fetchBlockedUsers();
    }
});
