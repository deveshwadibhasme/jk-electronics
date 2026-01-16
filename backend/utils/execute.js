import pool from "../config/connect-db.js";

let connection
async function execute(query, values) {

    connection = await pool.getConnection();
    await connection.execute(query, [...values]);
}

export default execute


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