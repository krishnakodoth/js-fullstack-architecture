import db from "../config/mysql.js";

class OrderRepository {
  async create(order) {
    const { user_id, total, status } = order;

    const [result] = await db.query(
      "INSERT INTO orders(user_id, total, status) VALUES(?,?,?)",
      [user_id, total, status],
    );

    return result.insertId;
  }

  async getByUser(userId) {
    const [rows] = await db.query("SELECT * FROM orders WHERE user_id = ?", [
      userId,
    ]);

    return rows;
  }

  // JOIN Example
  async getOrderDetails(orderId) {
    const [rows] = await db.query(
      `
      SELECT o.id as orderId,
             u.name as user,
             o.total,
             o.status
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `,
      [orderId],
    );

    return rows[0];
  }
}

export default new OrderRepository();