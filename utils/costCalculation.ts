import { ProductType } from "@/models/productDetails";

export const calculateCostFromProductCount = (
  products: ProductType[],
  productsCount: Map<String, number>
) => {
  let cartValue = 0;
  if (products && productsCount) {
    products.forEach((product) => {
      const count = productsCount.get(product._key) ?? 0;
      const price = product.price ?? 0;
      cartValue += count * price;
    });
  }
  return cartValue;
};
