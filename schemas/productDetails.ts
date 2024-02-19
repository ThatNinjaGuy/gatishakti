import { defineField } from "sanity";

// // Types of rooms
// const roomTypes = [
//   { title: "Basic", value: "basic" },
//   { title: "Luxury", value: "luxury" },
//   { title: "Suite", value: "suite" },
// ];

// Store details of hotel room for a booking
const productDetails = {
  name: "productDetails",
  title: "Product Details",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(50).error("Maximum 50 Characters"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.required().min(100).error("Minimum 100 Characters"),
    }),
    defineField({
      name: "productTypes",
      title: "Product Types",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "rank",
              title: "Rank",
              type: "number",
            },
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) =>
                Rule.required().max(50).error("Maximum 50 Characters"),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule) =>
                Rule.required().min(1).error("Minimum price is 1"),
            },
            {
              name: "sellingMetric",
              title: "Metric to sell at",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) =>
                Rule.required().min(50).error("Minimum 50 Characters"),
            },
            {
              name: "discount",
              title: "Discount",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.min(0),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "object",
      fields: [
        { name: "url", type: "url", title: "URL" },
        { name: "file", type: "file", title: "File" },
      ],
      validation: (Rule) => Rule.required().error("Cover Image is required"),
    }),
    // defineField({
    //   name: "type",
    //   title: "Room Type",
    //   type: "string",
    //   options: {
    //     list: roomTypes,
    //   },
    //   validation: (Rule) => Rule.required(),
    //   initialValue: "basic",
    // }),
    defineField({
      name: "isBooked",
      title: "Is Booked",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "review" }],
    }),
  ],
};

export default productDetails;
