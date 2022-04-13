export enum Category {
  DONG_TRUNG_HA_THAO = "DONG_TRUNG_HA_THAO",
  YEN_SAO_THUONG_HANG = "YEN_SAO_THUONG_HANG",
  SAFFARON = "SAFFARON",
  NHAN_SAM = "NHAN_SAM",
  KHAC = "KHAC",
}
export default interface IProduct {
  name: string;
  price: number;
  category: Category | "";
  description: string;
  mainImage: string;
  images: Array<string>;
}
