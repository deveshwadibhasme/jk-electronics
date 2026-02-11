import pool from "../config/connect-db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { withTransaction } from '../utils/execute.js'
import { sendMail } from '../service/email.service.js'

const generateOtp = () => {
    return Math.round((Math.random() * 9000) + 1000)
}

const nowIST = () => {
    const now = new Date();
    const expires = new Date(now.getTime() + 5 * 60 * 1000); // +5 min
    return expires.toISOString().slice(0, 19).replace("T", " ");
}

async function registerAdmin(req, res) {
    const { name, email, password } = req.body

    if (!name && !email && !password) {
        return res.status(401).json({ message: 'Enter Credentials' })
    }
    let connection
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const query = 'insert into admin (name, email, password) values (?, ?, ?)';

        await withTransaction(async (connection) => {
            await connection.execute(query, [name, email, hashedPassword]);
        });


        const token = jwt.sign({ email: email, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        res.cookie('token', token)
        return res.status(200).json({ message: 'Admin Registered Successfully', token: token });
    } catch (error) {
        console.error("Error:", error);
        if (connection) await connection.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function verifyUser(req, res) {
    const { email } = req.body
    const [existing] = await pool.query('select * from user where email = ?', [email])

    if (existing.length > 0) return res.status(400).json({ message: 'User Already Exist' })

    try {
        const otp = generateOtp()
        const expire_at = nowIST()

        await sendMail({
            to: email,
            subject: "OTP for Verification",
            html: `Your OTP for registration J.K. AutoElectronic Works is ${otp}`,
        })

        await pool.query('insert into otp_store (email,otp,expire_at) values (?,?,?)', [email, otp, expire_at])

        return res.status(200).json({ message: 'OTP Sent to Your Email' })

    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Server Error', error: error })
    }
}

async function registerUser(req, res) {
    const { name, email, password, number, address, otp } = req.body


    if (!name && !email && !password && !number) {
        return res.status(401).json({ message: 'Enter Credentials' })
    }
    let connection
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [rows] = await connection.query(
            "SELECT otp, expire_at FROM otp_store WHERE email = ?",
            [email]
        );
        if (!rows.length) {
            await connection.rollback();
            return res.status(400).json({ message: 'Invalid or expired OTP. Verify Email Again' });
        }


        const nowUTC = new Date();
        const expired = nowUTC > new Date(rows[0].expire_at + 'Z');

        console.log(new Date(rows[0].expire_at + 'Z'));

        if (expired) {
            await connection.query('DELETE FROM otp_store WHERE email = ?', [email]);
            await connection.commit();
            return res.status(400).json({ message: 'Invalid or expired OTP. Verify Email Again' });
        }

        if (otp !== rows[0].otp) {
            await connection.rollback();
            return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const query = 'insert into user (name, email, password, number, address) values (?, ?, ?, ?, ?)';

        await withTransaction(async (connection) => {
            await connection.execute(query, [name, email, hashedPassword, number, address]);
        });


        const token = jwt.sign({ email: email, role: 'user' }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        res.cookie('token', token)
        return res.status(200).json({ message: 'User Registered Successfully', token: token });
    } catch (error) {
        console.error("Error:", error);
        if (connection) await connection.rollback();
        return res.status(500).json({ message: "Internal Server Error" });
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
        if (rows[0].isBlock) {
            return res.status(401).json({ message: 'Check Your Credentials' })
        }

        const token = jwt.sign({ id: rows[0].id, email: email, status: false, role: 'admin' }, process.env.JWT_SECRET, {
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
        if (rows[0].isBlock === true) return res.status(401).json({ message: 'You are Blocked' })


        await connection.commit();
        const isValid = await bcrypt.compare(password, rows[0].password)

        if (!isValid) {
            return res.status(401).json({ message: 'Check Your Credentials' })
        }

        const token = jwt.sign({ id: rows[0].id, email: email, status: rows[0].isBlock, role: 'user' }, process.env.JWT_SECRET, {
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

export { registerAdmin, registerUser, logInAdmin, logInUser, verifyUser }