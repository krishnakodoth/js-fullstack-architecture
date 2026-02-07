import express from 'express';
import * as c from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', c.createOrder);
router.get('/:id', c.getOrder);

export default router;