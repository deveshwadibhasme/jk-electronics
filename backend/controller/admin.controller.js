import pool from "../config/connect-db.js";

const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id, name, email, isBlock FROM user');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const blockUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('UPDATE user SET isBlock = NOT isBlock WHERE id = ?', [id]);
        res.status(200).json({ message: 'User Status Changed successfully' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getBlockedUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id, name, email FROM user WHERE isBlock = 1');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const uploadData = async (req, res) => {
    const { name, price, description } = req.body;
    const { filename } = req.file;
    try {
        await pool.execute('INSERT INTO products (name, image, price, description) VALUES (?, ?, ?, ?)', [name, filename, price, description]);
        res.status(200).json({ message: 'Data uploaded successfully' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const [result] = await pool.execute(
            'UPDATE `order` SET status = ? WHERE id = ?',
            [status, orderId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT o.*, u.name as user_name, u.email as user_email , u.number as user_number
            FROM \`order\` o 
            JOIN user u ON o.user_id = u.id 
            ORDER BY o.id DESC
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM products ORDER BY id DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




export { getAllUsers, blockUser, getBlockedUsers, uploadData, updateOrderStatus, getAllOrders, deleteProduct, getProducts };
