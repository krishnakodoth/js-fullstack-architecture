const prisma = require('../../config/prisma');
const UserRepository = require('../../domain/interfaces/user.repository');

class PrismaUserRepo extends UserRepository {

  create(user) {
    return prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  }

  getById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) }
    });
  }

}

module.exports = PrismaUserRepo;
