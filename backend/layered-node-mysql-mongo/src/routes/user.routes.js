import  express from 'express';
import * as c from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', c.getUsers);
router.get('/:id', c.getUser);
router.post('/', c.createUser);

export default router;