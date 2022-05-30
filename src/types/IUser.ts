export default interface IUser {
  id: string;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  shoppingCart: { [key: string]: any };
}
