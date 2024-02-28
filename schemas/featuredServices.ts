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
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "isActive",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(100).error("Maximum 100 Characters"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(100).error("Minimum 100 Characters"),
    }),
    defineField({
      name: "metric1Name",
      title: "Metric1Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(50).error("Maximum 50 Characters"),
    }),
    defineField({
      name: "metric1Value",
      title: "Metric1Value",
      type: "number",
    }),
    defineField({
      name: "metric1TrailingText",
      title: "Metric1TrailingText",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(7).error("Maximum 7 characters"),
    }),
    defineField({
      name: "metric2Name",
      title: "Metric2Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(25).error("Maximum 25 Characters"),
    }),
    defineField({
      name: "metric2Value",
      title: "Metric2Value",
      type: "number",
    }),
    defineField({
      name: "metric2TrailingText",
      title: "Metric2TrailingText",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(7).error("Maximum 7 characters"),
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
      validation: (Rule) =>
        Rule.required().min(2).max(2).error("2 images required"),
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
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "Know More",
    }),
    defineField({
      name: "navigation_url",
      title: "Navigate to URL",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "materials",
    }),
  ],
};

export default featuredServices;
