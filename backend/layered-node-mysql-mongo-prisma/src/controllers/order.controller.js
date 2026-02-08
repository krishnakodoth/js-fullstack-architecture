import service from '../services/order.service.js';

export const createOrder = async (req, res, next) => {
  try {
    const id = await service.createOrder(req.body);
    res.json({ id, message: 'Order Created' });
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    res.json(await service.getOrderFull(req.params.id));
  } catch (err) {
    next(err);
  }
};
