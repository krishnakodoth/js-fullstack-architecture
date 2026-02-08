import prisma from '../config/prisma.js';

class OrderItemRepository {

  addItem(item) {
    return prisma.orderItem.create({
      data: {
        orderId: item.order_id,
        productId: item.product_id,
        qty: item.qty,
        price: item.price
      }
    });
  }

}

export default new OrderItemRepository();