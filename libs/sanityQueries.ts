import { groq } from "next-sanity";

export const getConstructionMaterialsQueries = groq`*[_type=="marketProducts"] | order(rank) {
    _id,
    rank, name, products
}`;

export const getRoom = groq`*[_type=="hotelRoom" && slug.current==$slug][0] {
    _id,
    coverImage,
    description, dimension,
    discount,
    images,
    isBooked,
    isFeatured,
    name,
    numberOfBeds,
    offeredAmenities,
    price, slug, specialNote,
    type
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
