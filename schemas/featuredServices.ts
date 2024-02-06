import { defineField } from "sanity";

// Store details of featured services to be shown on home page
const featuredServices = {
  name: "featuredServices",
  title: "Featured Services",
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
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.required().min(100).error("Minimum 100 Characters"),
    }),
    defineField({
      name: "metric1Name",
      title: "Metric1Name",
      type: "text",
      validation: (Rule) =>
        Rule.required().min(100).error("Minimum 25 Characters"),
    }),
    defineField({
      name: "metric1Value",
      title: "Metric1Value",
      type: "number",
      validation: (Rule) => Rule.required().min(1).error("Minimum value is 1"),
    }),
    defineField({
      name: "metric2Name",
      title: "Metric2Name",
      type: "text",
      validation: (Rule) =>
        Rule.required().min(100).error("Minimum 25 Characters"),
    }),
    defineField({
      name: "metric2Value",
      title: "Metric2Value",
      type: "number",
      validation: (Rule) => Rule.required().min(1).error("Minimum value is 1"),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            { name: "file", type: "file", title: "File" },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(2).error("2 images required"),
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
    defineField({
      name: "hookText",
      title: "Hook Text",
      type: "text",
      validation: (Rule) => Rule.required(),
      initialValue: "Know More",
    }),
  ],
};

export default featuredServices;
