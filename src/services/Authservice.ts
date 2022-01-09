import { IUserDocument, Roles } from './../models/types/user.model';
import { MongoErrorCodeNames, Retrieve, Update } from './types/Service';
import Baseservice from './Baseservice';
import { InputDataCreate, InputDataUpdatePhone } from './types/user.service';

import User from '../models/user';

class UserService extends Baseservice<IUserDocument> {
  constructor() {
    super(User);
  }
  async create(input_data: InputDataCreate): Promise<Update> {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        password,
        role,
        social_platform,
        device_id,
      } = input_data;
      const result = await User.create({
        first_name,
        last_name,
        email,
        phone,
        password,
        role,
        social_platform,
        device_id,
      });
      return {
        status: !!result?._id,
        id: result?.user_tag,
      };
    } catch (error) {
      return {
        status: false,
        errors: [(error as Error).message],
      };
    }
  }
}

export default UserService;
