type CoverImage = {
  url: string;
};

export type Image = {
  _key: string;
  url: string;
};

type Slug = {
  _type: string;
  current: string;
};

export type Product = {
  _key: string;
  rank: number;
  name: string;
  slug: Slug;
  price: number;
  sellingMetric: string;
  description: string;
  coverImage: CoverImage;
  specialNote: string;
  discount: number;
};

export type ConstructionMaterial = {
  _id: string;
  rank: number;
  name: string;
  products: Product[];
};
