"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define an interface for the context value
type ProductCountContextType = {
  productCountMap: Map<string, number>;
  updateProductCountMap: (key: string, value: number) => void;
  removeProduct: (key: string) => void;
};

// Provide a default value based on the interface
const defaultValue: ProductCountContextType = {
  productCountMap: new Map<string, number>(),
  updateProductCountMap: () => {},
  removeProduct: () => {},
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
  const [productCountMap, setProductCountMap] = useState<Map<string, number>>(
    new Map()
  );

  // Function to update the map, with parameters typed
  const updateProductCountMap = (key: string, value: number) => {
    setProductCountMap(new Map(productCountMap.set(key, value)));
  };

  // Function to remove a key from the map, with parameters typed
  const removeProduct = (key: string) => {
    const newMap = new Map(productCountMap);
    newMap.delete(key);
    setProductCountMap(newMap);
  };

  return (
    <ProductCountContext.Provider
      value={{ productCountMap, updateProductCountMap, removeProduct }}
    >
      {children}
    </ProductCountContext.Provider>
  );
};

// Hook to use the context
export const useProductCountMap = (): ProductCountContextType =>
  useContext(ProductCountContext);
