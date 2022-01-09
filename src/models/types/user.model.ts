import { Document } from 'mongoose';

export const MAXIMUM_FAILED_LOGIN_ATTEMPTS = 3;
export const MAXIMUM_MONTHS_TO_KEEP_SAME_PASSWORDS = 3;
export const INCORRECT_PASSWORD_LOGIN_BLOCK_TIME_IN_MINUTES = 15;
export interface IUserDocument extends Document {
  email: string;
  email_verified: boolean;
  user_tag?: string;
  first_name: string;
  last_name: string;
  phone?: string;
  phone_verified: boolean;
  password: string;
  role?: Roles;
  verification_codes: {
    email: string;
    phone: string;
    reset_password?: string;
  };
  notification_state: NotificationState;
  email_state: NotificationState;
  device_tokens: Array<string>;
  temporary_password: boolean;
  social_platform: SocialPlatforms;
  createdAt?: Date;
  email_otp_sent_at: Date;
  phone_otp_sent_at?: Date;
  forgot_password_otp_sent_at?: Date;
  login_blocked_until?: Date;
  failed_login_attempts: number;
  password_last_changed: Date;
  device_id?: string;
  two_factor_authentication_otp?: string;
  two_factor_authentication_otp_sent_at?: Date;
}
export enum SocialPlatforms {
  Facebook = 'facebook',
  Google = 'google',
}

export enum Roles {
  Provider = 'therapist',
  Customer = 'customer',
  StudioAdmin = 'studio_admin',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
}
export enum NotificationState {
  On = 'on',
  Off = 'off',
}
