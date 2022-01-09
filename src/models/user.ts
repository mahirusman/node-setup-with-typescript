import {
  IUserDocument,
  NotificationState,
  Roles,
  SocialPlatforms,
} from './types/user.model';
import { Model, Schema, model } from 'mongoose';
import validator from 'validator';
import { enumToArray } from '../utils';
import { EnumTypes } from '../utils/types';
import { Props } from './types/model';
import { encrypt } from '../utils/general_functions';

const allowedRoles = enumToArray(Roles, EnumTypes.String);
const allowedNotificationStates = enumToArray(
  NotificationState,
  EnumTypes.String
);
const allowedSocialPlatforms = enumToArray(SocialPlatforms, EnumTypes.String);

const schema = new Schema<IUserDocument>(
  {
    social_platform: {
      type: String,
      enum: allowedSocialPlatforms,
    },
    notification_state: {
      type: String,
      enum: allowedNotificationStates,
      default: NotificationState.On,
    },
    email_state: {
      type: String,
      enum: allowedNotificationStates,
      default: NotificationState.On,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (email: string) => {
          return validator.isEmail(email);
        },
        message: (props: Props) => `${props.value} is not a valid email!`,
      },
      required: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: (phone: string) => {
          return validator.isMobilePhone(phone);
        },
        message: (props: Props) =>
          `${props.value} is not a valid phone number!`,
      },
    },
    phone_verified: {
      type: Boolean,
      default: false,
    },
    user_tag: {
      type: String,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: allowedRoles,
      default: allowedRoles[0],
    },
    failed_login_attempts: {
      type: Number,
      default: 0,
    },
    login_blocked_until: {
      type: Date,
    },
    verification_codes: {
      email: {
        type: String,
        unique: true,
        sparse: true,
      },
      phone: {
        type: String,
        unique: true,
        sparse: true,
      },
      reset_password: {
        type: String,
        unique: true,
        sparse: true,
      },
    },
    temporary_password: {
      type: Boolean,
      default: false,
    },
    device_tokens: [
      {
        type: String,
      },
    ],
    email_otp_sent_at: {
      type: Date,
      default: () => new Date(),
    },
    phone_otp_sent_at: {
      type: Date,
    },
    forgot_password_otp_sent_at: {
      type: Date,
    },
    password_last_changed: {
      type: Date,
      default: new Date(),
    },
    device_id: {
      type: String,
    },
    two_factor_authentication_otp: {
      type: String,
    },
    two_factor_authentication_otp_sent_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);
class UserClass extends Model {
  //* virtual function: e.g. John D. */
  get nickName() {
    if (this.full_name) {
      const splittedNames = this.full_name.split(' ');
      return `${splittedNames[0]} ${
        splittedNames.length > 1 ? splittedNames[1][0] : ''
      }`;
    }
    return null;
  }
  get individualNames() {
    if (this.full_name) {
      const splittedNames = this.full_name.split(' ');
      return {
        firstName: splittedNames[0],
        lastName: splittedNames[0],
      };
    }
    return null;
  }
}

schema.loadClass(UserClass);

schema.pre('save', async function (this: IUserDocument, next) {
  //  ignore for update
  if (!this.isModified('password')) return next();
  this.password = await encrypt(this.password);
  this.password_last_changed = new Date();

  next();
});
export default model<IUserDocument>('User', schema);
