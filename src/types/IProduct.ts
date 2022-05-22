import { Category } from "./Category";

export enum ProductStates {
  AVAILABLE = "AVAILABLE",
  SOLD_OUT = "SOLD_OUT",
  COMING_SOON = "COMING_SOON",
}

export default interface IProduct {
  id?: string;
  name: string;
  price: number;
  origin: string;
  mass: number;
  category: Category | "";
  description: string;
  mainImage: string;
  images: Array<string>;
  sold?: number;
  state?: ProductStates;
}
