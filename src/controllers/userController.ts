import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import constants from '../config/constants';

import { ResponseStatusCodes } from '../utils/types/response_handler.utils';

import AuthService from '../services/Userservice';
import { sendResponse } from '../utils/response_handler';

import {
  filterParameters,
  requiredParametersProvided,
} from '../utils/request_handler';
import { Roles } from '../models/types/user.model';

const log = console.log;

const signToken = (id: string) => {
  const token = jwt.sign({ id }, constants.jwt_secrit, {
    expiresIn: constants.jwt_expire_in,
  });
  return token;
};

const singup = async (req: Request, res: Response) => {
  const userService = new AuthService();

  const allowedParameters = [
    'first_name',
    'last_name',
    'email',
    'password',
    'role',
  ];

  const userData = filterParameters(req.body, allowedParameters);

  console.log('userData ', userData);

  const optionalParameters = ['role'];

  if (
    !requiredParametersProvided(userData, allowedParameters, optionalParameters)
  ) {
    return sendResponse(
      {
        status_code: ResponseStatusCodes.BAD_REQUEST,
        errors: ['Please provide all the required parameters.'],
      },
      res
    );
  }
  const email = (userData.email as string).toLowerCase();

  //  check if email already exists
  const registeredUser = await userService.getOne({
    email,
  });
  console.log('registeredUser ', registeredUser);

  if (registeredUser) {
    return sendResponse(
      {
        status_code: ResponseStatusCodes.FORBIDDEN,
        errors: ['This email is already registered. Please log in.'],
      },
      res
    );
  }

  const parameters = {
    first_name: userData.first_name,
    last_name: userData.last_name as string,
    email,
    password: userData.password as string,
    role: userData.role as Roles,
  };

  const result = await userService.create(parameters);

  console.log('result ', result);
  // if(result.id){
  //   const result = await userService.getOneById();
  // }

  sendResponse(
    {
      status_code: ResponseStatusCodes.OK,
      messages: ['user register successfully'],
    },
    res
  );
};

export default {
  singup,
};
