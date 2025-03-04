export type IProduct = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  quantity: number;
  type: string;
  usege?: string;
  sideEffect?: string;
  precautions?: string;
  description: string;
  category: string;
  stockavailable: boolean;
  prescription: "Yes" | "No";
  expiryDate: Date;
  manufacturer: string;
};
