import { defineField } from "sanity";

// Store details of hotel room for a booking
const marketProducts = {
  name: "marketProducts",
  title: "Market Products - Construction Materials",
  type: "document",
  fields: [
    defineField({
      name: "rank",
      title: "Rank",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(50).error("Maximum 50 Characters"),
    }),
    defineField({
      name: "serviceCategory",
      title: "L1 Category of the service",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(50).error("Maximum 50 Characters"),
    }),
    defineField({
      name: "products",
      title: "Products",
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
            defineField({
              name: "slug",
              type: "slug",
              options: {
                source: (doc, context) => (context.parent as any).name,
              },
              validation: (Rule) => Rule.required(),
            }),
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
                Rule.required().min(100).error("Minimum 100 Characters"),
            },
            {
              name: "coverImage",
              title: "Cover Image",
              type: "object",
              fields: [
                { name: "url", type: "url", title: "URL" },
                { name: "file", type: "file", title: "File" },
              ],
              validation: (Rule) =>
                Rule.required().error("Cover Image is required"),
            },
          ],
        },
      ],
    }),
  ],
};

export default marketProducts;
