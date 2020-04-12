const db = require('./dbexec');

async function getAllOrders() {
    // получение объектов
    const conn = await db.connection();
    let res= await conn.query("SELECT ord_id, ord_date, ord_notes , C.cust_edrpou, C.cust_name FROM mydb.order O INNER JOIN customer C ON O.cust_edrpou = C.cust_edrpou;");
    conn.release();
    return res;
}

async function getOrder(id){
    // получение объектов
    const conn = await db.connection();
    let res= await conn.query(`SELECT ord_id, ord_date, ord_notes , cust_edrpou FROM mydb.order WHERE ord_id = ${id};`);
    conn.release();
    return res;
}

module.exports = { getAllOrders , getOrder };