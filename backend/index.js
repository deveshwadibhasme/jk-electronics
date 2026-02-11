import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import pool from "./config/connect-db.js";
import { runQueries } from "./utils/run-queries.js";

import authRoute from './routes/auth.route.js'
import adminRoute from './routes/admin.route.js'
import paymentRoute from './routes/payment.route.js'

const app = express();
dotenv.config()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


try {
    const connection = await pool.getConnection();
    // await runQueries(connection);
    console.log("Database Connected");
    connection.release();
} catch (err) {
    console.error("Error in Database connection:", err);
}

app.use('/api/auth', authRoute)
app.use('/api/admin', adminRoute)
app.use('/api/payment', paymentRoute)


app.get('/', (req, res) => {
    res.send('<h1>J.K. Electronic Server by Resicode</h1>');
});



app.listen(3000, () => {
    console.log(`Server Running on: http://localhost:3000/`);
})