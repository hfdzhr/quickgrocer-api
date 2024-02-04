import { prismaClient } from '../application/database.js';
import jwt from 'jsonwebtoken';
import { ResponseError } from '../error/response-error.js';

export const memberAuthMiddleware = async (req, res, next) => {
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

    console.log(decodedToken);

    const member = await prismaClient.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!member) {
      return res
        .status(401)
        .json({
          errors: 'Unauthorized, member not found',
        })
        .end();
    }

    if (decodedToken.role !== 'MEMBER') {
      return res
        .status(401)
        .json({
          errors:
            'Access denied. This endpoint is only accessible for users with the member role.',
        })
        .end();
    }

    req.member = member;
    next();
  } catch (error) {
    console.error(error);
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return res.status(401).json({
        errors: 'Auth failed, invalid token',
      });
    } else {
      return res.status(500).json({
        errors: 'Internal server error',
      });
    }
  }
};

export const merchantAuthMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({
          errors: 'Unauthorized, Token not found',
        })
        .end();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const merchant = await prismaClient.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!merchant) {
      return res
        .status(401)
        .json({
          errors: 'Unauthorized, Merchant not found',
        })
        .end();
    }

    if (decodedToken.role !== 'MERCHANT') {
      return res
        .status(401)
        .json({
          errors: 'You are not allowed to access this',
        })
        .end();
    }

    req.merchant = merchant;
    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return res
        .status(401)
        .json({
          errors: 'Auth falied, invalid token',
        })
        .end();
    } else {
      return res
        .status(500)
        .json({
          errors: 'Internal Server Error',
        })
        .end();
    }
  }
};
