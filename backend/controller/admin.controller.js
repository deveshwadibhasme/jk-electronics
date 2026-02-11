import pool from "../config/connect-db.js";

const getAllUsers = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT id, name, email, isBlock FROM user');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (connection) connection.release();
    }
};

const blockUser = async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.execute('UPDATE user SET isBlock = NOT isBlock WHERE id = ?', [id]);
        res.status(200).json({ message: 'User Status Changed successfully' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (connection) connection.release();
    }
};

const getBlockedUsers = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT id, name, email FROM user WHERE isBlock = 1');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (connection) connection.release();
    }
};

const uploadData = async (req, res) => {
    const { name, price, description } = req.body;
    const { filename } = req.file;
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.execute('INSERT INTO products (name, image, price, description) VALUES (?, ?, ?, ?)', [name, filename, price, description]);
        res.status(200).json({ message: 'Data uploaded successfully' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (connection) connection.release();
    }
};

export { getAllUsers, blockUser, getBlockedUsers, uploadData };
