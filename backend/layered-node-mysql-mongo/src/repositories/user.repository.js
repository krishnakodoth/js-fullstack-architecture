import db from '../config/mysql.js';
import { NotFoundError } from '../utils/errors.js';

class UserRepository {

  async getAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  async getById(id) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    if(rows.length === 0) {
      throw new NotFoundError('User Not Found');
    }
    return rows[0];
  }

  async create(user) {
    const { name, email, phone } = user;

    const [result] = await db.query(
      'INSERT INTO users(name, email, phone) VALUES(?,?,?)',
      [name, email, phone]
    );

    return result.insertId;
  }

}

export default new UserRepository();