"use client";
import { useState, useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ProductForm() {
  const {
    addProduct,
    editProduct,
    editingProduct,
    setEditingProduct,
    isModalOpen,
    setIsModalOpen,
  } = useProductContext();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        id: editingProduct.id,
        name: editingProduct.name,
        image: editingProduct.image,
        price: editingProduct.price.toString(),
      });
      setEditing(true);
    } else {
      setFormData({ id: "", name: "", image: "", price: "" });
      setEditing(false);
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.price || !formData.image) return;

    const newProduct = {
      id: (Math.random() * 1000).toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
    };

    addProduct(newProduct);
    setFormData({ id: "", name: "", price: "", image: "" });
    setIsModalOpen(false); // Close modal
  };

  const handleUpdate = () => {
    editProduct(formData.id, {
      ...formData,
      price: parseFloat(formData.price),
    });
    setEditingProduct(null);
    setIsModalOpen(false); // Close modal
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />

        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />

        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />

        <DialogFooter className="flex !justify-center align-middle ">
          <Button
            onClick={editing ? handleUpdate : handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            {editing ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
