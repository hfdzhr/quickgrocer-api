import { validate } from '../validation/validation.js';
import {
  loginMerchantValidation,
  registerMerchantValidation,
} from '../validation/merchant-validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const register = async (request) => {
  const merchant = validate(registerMerchantValidation, request);

  const countMerchant = await prismaClient.user.count({
    where: {
      email: merchant.email,
    },
  });

  if (countMerchant === 1) {
    throw new ResponseError(409, 'Email already exists');
  }

  const CountMerchantName = await prismaClient.user.count({
    where: {
      merchant_name: merchant.merchant_name,
    },
  });

  if (CountMerchantName === 1) {
    throw new ResponseError(409, 'Merchant name already exists');
  }

  merchant.password = await argon2.hash(merchant.password);

  merchant.role = 'MERCHANT';

  return prismaClient.user.create({
    data: merchant,
    select: {
      id: true,
      email: true,
      role: true,
      merchant_name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginMerchantValidation, request);

  const merchant = await prismaClient.user.findFirst({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      email: true,
      phone_number: true,
      role: true,
      password: true,
      merchant_name: true,
    },
  });

  if (!merchant) {
    throw new ResponseError(401, 'Email or password wrong');
  }

  const isPasswordValid = await argon2.verify(
    merchant.password,
    loginRequest.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, 'Email or password wrong');
  }

  const payload = {
    id: merchant.id,
    role: merchant.role,
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
      id: merchant.id,
      email: merchant.email,
      phone_number: merchant.phone_number,
      full_name: merchant.full_name,
      role: merchant.role,
      merchant_name: merchant.merchant_name,
    },
  };
};

// const get = async (username) => {
//   username = validate(getUserValidation, username);

//   const user = await prismaClient.user.findUnique({
//     where: {
//       username: username,
//     },
//     select: {
//       username: true,
//       name: true,
//     },
//   });

//   if (!user) {
//     throw new ResponseError(404, 'user is not found');
//   }

//   return user;
// };

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
  //   get,
  //   update,
  //   logout,
};
