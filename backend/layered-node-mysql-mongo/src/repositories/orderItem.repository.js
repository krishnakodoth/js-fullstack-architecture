import db from '../config/mysql.js';

class OrderItemRepository {

  async addItem(item) {
    const { order_id, product_id, qty, price } = item;

    await db.query(
      `INSERT INTO order_items
       (order_id, product_id, qty, price)
       VALUES (?,?,?,?)`,
      [order_id, product_id, qty, price]
    );
  }

  async getItems(orderId) {
    const [rows] = await db.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [orderId]
    );

    return rows;
  }

}

export default new OrderItemRepository();