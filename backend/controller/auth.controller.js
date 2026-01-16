import pool from "../config/connect-db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function registerAdmin(req, res) {
    const { name, email, password } = req.body

    if (!name && !email && !password) {
        return res.status(401).json({ message: 'Enter Credentials' })
    }

    let connection;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        connection = await pool.getConnection();
        await connection.beginTransaction();

        const query = 'insert into admin (name, email, password) values (?, ?, ?)';
        await connection.execute(query, [name, email, hashedPassword]);

        await connection.commit();

        const token = jwt.sign({ email: email, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        res.cookie('token', token)
        return res.status(200).json({ message: 'Admin Registered Successfully', token: token });
    } catch (error) {
        console.error("Error:", error);
        if (connection) await connection.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (connection) connection.release();
    }
}

async function registerUser(req, res) {
    const { name, email, password, number } = req.body

    if (!name && !email && !password && !number) {
        return res.status(401).json({ message: 'Enter Credentials' })
    }

    let connection;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        connection = await pool.getConnection();
        await connection.beginTransaction();

        const query = 'insert into user (name, email, password, number) values (?, ?, ?, ?)';
        await connection.execute(query, [name, email, hashedPassword, number]);

        await connection.commit();

        const token = jwt.sign({ email: email, role: 'user' }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        res.cookie('token', token)
        return res.status(200).json({ message: 'User Registered Successfully', token: token });
    } catch (error) {
        console.error("Error:", error);
        if (connection) await connection.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (connection) connection.release();
    }
}

async function logInAdmin(req, res) {
    const { email, password } = req.body

    if (!email && !password) {
        return res.status(401).json({ message: 'Enter Credentials' })
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const query = 'select * from admin where email = ?';
        const [rows] = await connection.execute(query, [email]);
        if (rows.length === 0) return res.status(401).json({ message: 'Credential Incorrect' })


        await connection.commit();
        const isValid = await bcrypt.compare(password, rows[0].password)

        if (!isValid) {
            return res.status(401).json({ message: 'Check Your Credentials' })
        }

        const token = jwt.sign({ email: email, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        res.cookie('token', token)
        return res.status(200).json({ message: 'Admin Login Successfully', token: token });
    } catch (error) {
        console.error("Error:", error);
        if (connection) await connection.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (connection) connection.release();
    }
}

async function logInUser(req, res) {
    const { email, password } = req.body

    if (!email && !password) {
        return res.status(401).json({ message: 'Enter Credentials' })
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const query = 'select * from user where email = ?';
        const [rows] = await connection.execute(query, [email]);
        if (rows.length === 0) return res.status(401).json({ message: 'Credential Incorrect' })


        await connection.commit();
        const isValid = await bcrypt.compare(password, rows[0].password)

        if (!isValid) {
            return res.status(401).json({ message: 'Check Your Credentials' })
        }

        const token = jwt.sign({ email: email, role: 'user' }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        res.cookie('token', token)
        return res.status(200).json({ message: 'User Login Successfully', token: token });
    } catch (error) {
        console.error("Error:", error);
        if (connection) await connection.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    } finally {
        if (connection) connection.release();
    }
}

export { registerAdmin, registerUser, logInAdmin, logInUser }