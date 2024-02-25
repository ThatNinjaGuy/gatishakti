"use client";

import { ProductType } from "@/models/productDetails";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  productCount: number;
  productType: ProductType;
};

// Define an interface for the context value
type ProductCountContextType = {
  productCartList: Map<string, CartItem>;
  updateProductCartList: (key: string, value: CartItem) => void;
  removeProductFromCartList: (key: string) => void;
};

// Provide a default value based on the interface
const defaultValue: ProductCountContextType = {
  productCartList: new Map<string, CartItem>(),
  updateProductCartList: () => {},
  removeProductFromCartList: () => {},
};

// Create the context with the default value
const ProductCountContext =
  createContext<ProductCountContextType>(defaultValue);

// Type the props for your provider
type ProductCountProviderProps = {
  children: ReactNode;
};

export const ProductCountProvider: React.FC<ProductCountProviderProps> = ({
  children,
}) => {
  const [productCartList, setProductCountList] = useState<
    Map<string, CartItem>
  >(new Map());

  // Function to update the map, with parameters typed
  const updateProductCountMap = (key: string, value: CartItem) => {
    setProductCountList(new Map(productCartList.set(key, value)));
  };

  // Function to remove a key from the map, with parameters typed
  const removeProduct = (key: string) => {
    const newMap = new Map(productCartList);
    newMap.delete(key);
    setProductCountList(newMap);
  };

  return (
    <ProductCountContext.Provider
      value={{
        productCartList,
        updateProductCartList: updateProductCountMap,
        removeProductFromCartList: removeProduct,
      }}
    >
      {children}
    </ProductCountContext.Provider>
  );
};

// Hook to use the context
export const useProductCartList = (): ProductCountContextType =>
  useContext(ProductCountContext);
