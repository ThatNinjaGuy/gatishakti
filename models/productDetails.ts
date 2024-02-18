type CoverImage = {
  url: string;
};

export type Image = {
  _key: string;
  url: string;
};

export type ProductType = {
  _key: string;
  rank: number;
  name: string;
  price: number;
  sellingMetric: string;
  description: string;
  discount: number;
};

type Slug = {
  _type: string;
  current: string;
};

export type ProductDetails = {
  _id: string;
  name: string;
  slug: Slug;
  description: string;
  productTypes: ProductType[];
  coverImage: CoverImage;
  isBooked: boolean;
  isFeatured: boolean;
};

export type CreateBookingDto = {
  user: string;
  hotelRoom: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};
