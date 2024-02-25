"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ProductType } from "@/models/productDetails";

export type CartItem = {
  productCount: number;
  productType: ProductType;
};

type ProductCountContextType = {
  productCartList: Map<string, CartItem>;
  updateProductCartList: (key: string, value: CartItem) => void;
  removeProductFromCartList: (key: string) => void;
};

const defaultValue: ProductCountContextType = {
  productCartList: new Map<string, CartItem>(),
  updateProductCartList: () => {},
  removeProductFromCartList: () => {},
};

const ProductCountContext =
  createContext<ProductCountContextType>(defaultValue);

// Type the props for your provider
type ProductCountProviderProps = {
  children: ReactNode;
};

export const ProductCountProvider: React.FC<ProductCountProviderProps> = ({
  children,
}) => {
  // Initialize state with local storage or empty Map
  const [productCartList, setProductCartList] = useState<Map<string, CartItem>>(
    () => {
      const storedCartList = localStorage.getItem("cartList");
      return storedCartList ? new Map(JSON.parse(storedCartList)) : new Map();
    }
  );

  // Update local storage when productCartList changes
  useEffect(() => {
    localStorage.setItem(
      "cartList",
      JSON.stringify(Array.from(productCartList.entries()))
    );
  }, [productCartList]);

  const updateProductCartList = (key: string, value: CartItem) => {
    const updatedMap = new Map(productCartList.set(key, value));
    setProductCartList(updatedMap);
  };

  const removeProductFromCartList = (key: string) => {
    const newMap = new Map(productCartList);
    newMap.delete(key);
    setProductCartList(newMap);
  };

  return (
    <ProductCountContext.Provider
      value={{
        productCartList,
        updateProductCartList,
        removeProductFromCartList,
      }}
    >
      {children}
    </ProductCountContext.Provider>
  );
};

// Hook to use the context
export const useProductCartList = (): ProductCountContextType =>
  useContext(ProductCountContext);
