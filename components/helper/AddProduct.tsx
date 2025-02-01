"use client"
import React from "react";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/UserContext";
import { useProductContext } from "@/context/ProductContext";

const AddProduct = () => {
  const { user } = useUserContext();
  const { setEditingProduct, setIsModalOpen } = useProductContext();
  const handleAddProduct = () => {
    setEditingProduct(null); // Reset editing state for new product
    setIsModalOpen(true);
  };
  let content = <></>;
  if (user?.role === "admin") {
    content = (
      <div className="flex justify-end">
        <Button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          + Add Product
        </Button>
      </div>
    );
  }

  return content;
};

export default AddProduct;
