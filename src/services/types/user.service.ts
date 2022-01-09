import {
  IUserDocument,
  Roles,
  SocialPlatforms,
} from '../../models/types/user.model';

export interface InputDataCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Roles;
  social_platform?: SocialPlatforms;
  device_id?: string;
}
export interface InputDataUpdatePhone {
  phone: string;
}
