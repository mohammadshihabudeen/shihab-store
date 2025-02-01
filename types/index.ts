// types/index.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface ProductListProps {
  products: Product[];
}

export interface UserType {
  id: string;
  username: string;
  role: string;
}
