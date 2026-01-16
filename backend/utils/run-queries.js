import fs from 'fs'

export async function runQueries(connection) {

    const models = ['admin', 'user', 'car_list', 'car_info', 'car_file', 'otp_store', 'img_store', 'transaction'];

    for (const modelName of models) {
        const sql = fs.readFileSync(`./model/${modelName}.model.sql`, 'utf8');
        const queries = sql.split(';').filter(query => query.trim() !== '');
        for (const query of queries) {
            await connection.query(query);
        }
    }

}