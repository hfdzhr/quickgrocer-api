import userService from '../service/user-service.js';
import jwt from 'jsonwebtoken';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({
          errors: 'Unauthorized',
        })
        .end();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const result = await userService.get(decodedToken);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  get,
};
