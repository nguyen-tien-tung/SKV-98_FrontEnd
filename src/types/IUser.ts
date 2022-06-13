export default interface IUser {
  id: string;
  avatar?: string;
  name?: string;
  address?: string;
  dateOfBirth?: string;
  username: string;
  phoneNumber: string;
  email: string;
  shoppingCart: { [key: string]: any };
  loyaltySetting: { [key: string]: any };
}
