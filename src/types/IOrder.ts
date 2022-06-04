export enum PaymentMethod {
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
}
export enum OrderRequestState {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  CANCELLED = "CANCELLED",
  DONE = "DONE",
}
export default interface IOrder {
  id?: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  note: string;
  paymentMethod: PaymentMethod;
  state?: OrderRequestState;
  createdAt?: string;
  items?: { [key: string]: any };
}
export interface IOrderResponse {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  note: string;
  paymentMethod: PaymentMethod;
  state: OrderRequestState;
  createdAt?: string;
  items?: { [key: string]: any };
}
