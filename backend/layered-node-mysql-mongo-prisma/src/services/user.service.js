import repo from '../repositories/user.repository.js';

class UserService {

  getUsers() {
    return repo.getAll();
  }

  getUser(id) {
    return repo.getById(id);
  }

  createUser(data) {
    return repo.create(data);
  }

}

export default new UserService();