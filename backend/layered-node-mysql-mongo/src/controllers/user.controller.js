import service from '../services/user.service.js';

export const getUsers = async (req, res, next) => {
  try {
    res.json(await service.getUsers());
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await service.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    if (err.message === 'User Not Found') {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const id = await service.createUser(req.body);
    res.json({ id, message: 'User Created' });
  } catch (err) {
    next(err);
  }
};
