import { useState } from "react";
import { Product } from "../../types";

interface UseNewProductProps {
  onProductAdd: (newProduct: Product) => void;
}

export const useNewProduct = ({ onProductAdd }: UseNewProductProps) => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };

  const toggleNewProductForm = () => {
    setShowNewProductForm((prev) => !prev);
  };

  return {
    newProduct,
    setNewProduct,
    showNewProductForm,
    toggleNewProductForm,
    handleAddNewProduct,
  };
};
