export default interface IUser {
  id: string;
  avatar?: string;
  fullName?: string;
  address?: string;
  dateOfBirth?: string;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  shoppingCart: { [key: string]: any };
  loyaltySetting: { [key: string]: any };
}
