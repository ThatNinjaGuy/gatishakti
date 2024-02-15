type CoverImage = {
  url: string;
};

export type Image = {
  _key: string;
  url: string;
};

type Ammenity = {
  _key: string;
  amenity: string;
  icon: string;
};

type Slug = {
  _type: string;
  current: string;
};

export type Services = {
  _id: string;
  name: string;
  slug: Slug;
  isActive: boolean;
  title: string;
  description: string;
  metric1Name: string;
  metric1Value: number;
  metric1TrailingText: string;
  metric2Name: string;
  metric2Value: number;
  metric2TrailingText: string;
  images: Image[];
  coverImage: CoverImage;
  hookText: string;
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
