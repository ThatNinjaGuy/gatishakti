import { groq } from "next-sanity";

export const getConstructionMaterialsQuery = groq`*[_type=="marketProducts"] | order(rank) {
    _id,
    rank, name, products
}`;

export const getProductDetails = groq`*[_type=="productDetails" && slug.current==$slug][0] {
    _id,
    name,
    slug, description,
    productTypes,
    coverImage,
    isBooked,
    isFeatured,
}`;

export const getFeaturedServicesQuery = groq`*[_type=="featuredServices" && isActive == true] {
    _id,
    name,
    slug,
    isActive,
    title,
    description,
    metric1Name,
    metric1Value,
    metric1TrailingText,
    metric2Name,
    metric2Value,
    metric2TrailingText,
    images,
    coverImage,
    hookText
}`;
