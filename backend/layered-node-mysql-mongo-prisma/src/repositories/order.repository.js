import prisma from '../config/prisma.js';

class OrderRepository {

  create(order) {
    return prisma.order.create({
      data: {
        userId: order.user_id,
        total: order.total,
        status: order.status
      }
    });
  }

  getByUser(userId) {
    return prisma.order.findMany({
      where: { userId: Number(userId) }
    });
  }

  getOrderDetails(orderId) {
    return prisma.order.findUnique({
      where: { id: Number(orderId) },

      include: {
        user: true,
        items: true
      }
    });
  }

}

export default new OrderRepository();