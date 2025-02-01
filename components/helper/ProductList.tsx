"use client";
import React from "react";
import { Button } from "../ui/button";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useProductContext } from "@/context/ProductContext";
import { useSession } from "next-auth/react";
import { Product } from "@/types";
import Image from "next/image";

const ProductList = () => {
  const { setIsModalOpen, setEditingProduct } = useProductContext();
  const { products, deleteProduct } = useProductContext();
  const { data: session } = useSession();

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg"
            >
              <div className="flex items-center">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={50}
                  height={50}
                  className="rounded-md mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600">Price: ${p.price}</p>
                </div>
              </div>
              {session?.user?.role === "admin" ? (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(p)}
                    className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Add to Cart
                </Button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>No Products Found!</AlertTitle>
          <AlertDescription>
            There are currently no products available.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProductList;
