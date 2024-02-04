import { validate } from '../validation/validation.js';
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from '../validation/user-validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(409, 'Email already exists');
  }

  user.password = await argon2.hash(user.password);

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findFirst({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      full_name: true,
      email: true,
      phone_number: true,
      role: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'Email or password wrong');
  }

  const isPasswordValid = await argon2.verify(
    user.password,
    loginRequest.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, 'Email or password wrong');
  }

  const payload = {
    id: user.id,
    role: user.role,
  };

  let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  });

  if (!token) {
    throw new ResponseError(500, 'Token creation failed');
  }

  return {
    token: `${token}`,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      full_name: user.full_name,
      role: user.role,
    },
  };
};

const get = async (request) => {
  const userId = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'user is not found');
  }

  return user;
};

// const update = async (request) => {
//   const user = validate(updateUserValidation, request);

//   const totalUserInDatabase = await prismaClient.user.count({
//     where: {
//       username: user.username,
//     },
//   });

//   if (totalUserInDatabase !== 1) {
//     throw new ResponseError(404, 'user is not found');
//   }

//   const data = {};
//   if (user.name) {
//     data.name = user.name;
//   }
//   if (user.password) {
//     data.password = await bcrypt.hash(user.password, 10);
//   }

//   return prismaClient.user.update({
//     where: {
//       username: user.username,
//     },
//     data: data,
//     select: {
//       username: true,
//       name: true,
//     },
//   });
// };

// const logout = async (username) => {
//   username = validate(getUserValidation, username);

//   const user = await prismaClient.user.findUnique({
//     where: {
//       username: username,
//     },
//   });

//   if (!user) {
//     throw new ResponseError(404, 'user is not found');
//   }

//   return prismaClient.user.update({
//     where: {
//       username: username,
//     },
//     data: {
//       token: null,
//     },
//     select: {
//       username: true,
//     },
//   });
// };

export default {
  register,
  login,
  get,
  //   update,
  //   logout,
};
