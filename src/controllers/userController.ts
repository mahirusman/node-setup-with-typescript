import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import constants from '../config/constants';

import AuthService from '../services/Authservice';
const log = console.log;

const signToken = (id: string) => {
  const token = jwt.sign({ id }, constants.jwt_secrit, {
    expiresIn: constants.jwt_expire_in,
  });
  return token;
};

const singup = async (req: Request, res: Response) => {
  const authService = new AuthService();

  const response = await authService.create(req.body);
  res.status(209);

  if (!response.status) {
    return res.status(400).json(response);
  }

  // const token = signToken(response.user._id);

  return res.status(201).json({
    response,
    // token,
  });
};

export default {
  singup,
};
