import prisma from '../config/prisma.js';

class UserRepository {

  getAll() {
    return prisma.user.findMany();
  }

  getById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) }
    });
  }

  create(data) {
    return prisma.user.create({
      data
    });
  }

}

export default new UserRepository();
