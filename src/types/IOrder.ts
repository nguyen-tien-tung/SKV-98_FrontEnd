export enum PaymentMethod {
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export default interface IOrder {
  fullName: string;
  phoneNumber: string;
  address: string;
  note: string;
  paymentMethod: PaymentMethod;
}
