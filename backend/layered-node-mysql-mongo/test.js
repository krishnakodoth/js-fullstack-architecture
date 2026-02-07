import db from './src/config/mysql.js';

try {
  await db.query('SELECT 1');
  console.log('MySQL Connected ✅');
} catch (err) {
  console.log(err);
}
