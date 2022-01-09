import { IUserDocument } from '../../models/types/user.model';

export type RequestBody =
  | {
      [key: string]: boolean | number | string | string[] | number[] | null;
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any;
export type AllowedParameters = Array<string>;
export type DecodeUser = {
  _id: Pick<IUserDocument, '_id'>;
} | null;
