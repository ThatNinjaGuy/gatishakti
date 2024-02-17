import { groq } from "next-sanity";

export const getFeaturedRoomsQuery = groq`*[_type=="hotelRoom" && isFeatured == true][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
}`;

export const getRoomsQuery = groq`*[_type=="hotelRoom"] | order(rank) {
    _id,
    coverImage,
    description, dimension,
    isBooked, isFeatured,
    name, price, slug, type
}`;

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
