import pool from "../config/connect-db.js";

async function withTransaction(fn) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await fn(connection);
        await connection.commit();
        return result;
    } catch (e) {
        await connection.rollback();
        throw e;
    } finally {
        connection.release();
    }
}

export { withTransaction }


// The 4 rules of a Transaction (ACID)
// You should know this. If not, that’s a gap.

// 1️⃣ Atomicity

// All or nothing.

// If one query fails → rollback everything.

// 2️⃣ Consistency

// DB moves from one valid state to another.

// No half-written junk data.

// 3️⃣ Isolation

// Other queries don’t see partial changes.

// No dirty reads.

// 4️⃣ Durability

// Once committed, data will not disappear even if server crashes.