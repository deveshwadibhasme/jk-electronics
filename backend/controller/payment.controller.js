import Razorpay from 'razorpay';
import crypto from 'crypto';
import pool from "../config/connect-db.js";
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const createOrder = async (req, res) => {
    const { amount, currency = "INR" } = req.body;

    try {
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ order, userInfo: req.user });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ message: "Could not create order" });
    }
};

const verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        totalAmount,
        products
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        .update(sign.toString())
        .digest("hex");

    let connection
    if (razorpay_signature === expectedSign) {
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const [txResult] = await connection.execute(
                'INSERT INTO transaction (user_id, order_id, payment_id, signature, amount, status) VALUES (?, ?, ?, ?, ?,?)',
                [userId, razorpay_order_id, razorpay_payment_id, razorpay_signature, totalAmount, 'success']
            );

            const [user] = await connection.execute(
                'select address, number from user where id = ?',
                [userId]
            );

            const transactionId = txResult.insertId;

            for (const product of products) {
                await connection.execute(
                    'INSERT INTO `order` (user_id, razorpay_order_id, total_amount, shipping_address, contact_number, status, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [userId, transactionId, product.price, user[0].address, user[0].number, 'pending', 'paid']
                );
            }
            await connection.commit();
            return res.status(200).json({ message: "Payment verified and order placed successfully" });
        } catch (error) {
            if (connection) await connection.rollback();
            console.error("Database Transaction Error:", error);
            return res.status(500).json({ message: "Payment verified but failed to save order" });
        } finally {
            connection.release()
        }
    } else {
        return res.status(400).json({ message: "Invalid signature sent!" });
    }
};

export { createOrder, verifyPayment };