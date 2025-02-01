"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { products as initialProducts } from "../lib/products";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductContextType {
  products: Product[];
  search: string;
  setSearch: (search: string) => void;
  addProduct: (product: Product) => void;
  editProduct: (id: string, updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  minPrice:number;
  setMinPrice:(setMinPrice: number) => void;
  maxPrice:number;
  setMaxPrice:(setMinPrice: number) => void;

}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price >= minPrice &&
      p.price <= maxPrice
  );

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const editProduct = (id: string, updatedProduct: Product) => {
    setProducts(
      products.map((product) => (product.id === id ? updatedProduct : product))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        search,
        setSearch,
        addProduct,
        editProduct,
        deleteProduct,
        editingProduct,
        setEditingProduct,
        isModalOpen,
        setIsModalOpen,
        minPrice,
        setMinPrice,
        maxPrice, 
        setMaxPrice
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
