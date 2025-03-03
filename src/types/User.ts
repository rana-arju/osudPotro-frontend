export type IUser = {
  name: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  phone?: string;
  role: "customer" | "admin";
  status: "in-progress" | "blocked";
};

 