import orderRepo from '../repositories/order.repository.js';
import itemRepo from '../repositories/orderItem.repository.js';

class OrderService {

  async createOrder(data) {

    // 1. Create order
    const orderId = await orderRepo.create({
      user_id: data.user_id,
      total: data.total,
      status: 'CREATED'
    });

    // 2. Add items
    for (let item of data.items) {
      await itemRepo.addItem({
        order_id: orderId,
        ...item
      });
    }

    return orderId;
  }

  async getOrderFull(orderId) {

    const order = await orderRepo.getOrderDetails(orderId);
    const items = await itemRepo.getItems(orderId);

    return {
      ...order,
      items
    };
  }

}

export default new OrderService();
