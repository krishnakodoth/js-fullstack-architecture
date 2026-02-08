const User = require('../domain/entities/user');

class CreateUser {

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {

    const user = new User(data);

    return this.userRepository.create(user);
  }
}

module.exports = CreateUser;
