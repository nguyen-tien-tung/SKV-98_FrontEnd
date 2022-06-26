export enum UserStates {
  UNVERIFIED = "UNVERIFIED",
  ACTIVE = "ACTIVE",
  LOCKED = "LOCKED",
  ADMIN = "ADMIN",
}
export default interface IUser {
  id: string;
  avatar?: string;
  name?: string;
  address?: string;
  state?: UserStates;
  dateOfBirth?: string;
  username: string;
  phoneNumber: string;
  email: string;
  shoppingCart: { [key: string]: any };
  loyaltySetting: { [key: string]: any };
}
