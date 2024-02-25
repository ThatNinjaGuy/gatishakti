import { CartItem } from "@/app/context/ProductCountContext";

export const calculateCostFromProductCount = (
  productCartList: Map<String, CartItem>
) => {
  let cartValue = 0;
  if (productCartList) {
    productCartList.forEach(({ productCount, productType }) => {
      const count = productCount;
      const price = productType.price ?? 0;
      cartValue += count * price;
    });
  }
  return cartValue;
};

export const getProductCountFromCartList = (
  productCartList: Map<String, CartItem>
) => {
  let count = 0;
  if (productCartList) {
    productCartList.forEach(({ productCount }) => {
      count += productCount;
    });
  }
  return count;
};
