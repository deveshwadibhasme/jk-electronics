import express from 'express';
import pool from "../config/connect-db.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/my-order', auth, async (req, res) => {
    const userId = req.user.id;

    try {
        const [orders] = await pool.execute(
            `SELECT 
                o.id as order_id, 
                o.total_amount, 
                o.status as order_status, 
                o.payment_status, 
                o.created_at,
                t.payment_id,
                t.status as transaction_status,
                o.razorpay_order_id
             FROM \`order\` o
             LEFT JOIN transaction t ON o.razorpay_order_id = t.order_id
             WHERE o.user_id = ?
             ORDER BY o.created_at DESC`,
            [userId]
        );

        res.status(200).json(orders);
    } catch (error) {
        console.error("Fetch My Orders Error:", error);
        res.status(500).json({ message: "Internal server error while fetching orders" });
    }
});

export default router;
