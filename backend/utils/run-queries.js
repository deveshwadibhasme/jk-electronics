import fs from 'fs'

export async function runQueries(connection) {

    const models = ['admin', 'user', 'otp_store', 'transaction', 'product', 'order'];

    for (const modelName of models) {
        const sql = fs.readFileSync(`./models/${modelName}.model.sql`, 'utf8');
        const queries = sql.split(';').filter(query => query.trim() !== '');
        for (const query of queries) {
            await connection.query(query);
        }
    }

}