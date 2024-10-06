export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
};

export type Variant = "LOGIN" | "REGISTER";
