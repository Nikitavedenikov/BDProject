const db = require('./dbexec');

async function getAllManuf() {
    // получение объектов
    const conn = await db.connection();
    return results = conn.query("SELECT man_id, man_name, man_phone FROM manufacturer");
}

module.exports = { getAllManuf };