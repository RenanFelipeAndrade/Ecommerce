export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
    {
      name: "reviews",
      title: "Reviews",
      type: "object",
      fields: [
        {
          name: "oneStar",
          title: "1 Star",
          type: "number",
          initialValue: 0,
        },
        {
          name: "twoStar",
          title: "2 Star",
          type: "number",
          initialValue: 0,
        },
        {
          name: "threeStar",
          title: "3 Star",
          type: "number",
          initialValue: 0,
        },
        {
          name: "fourStar",
          title: "4 Star",
          type: "number",
          initialValue: 0,
        },
        {
          name: "fiveStar",
          title: "5 Star",
          type: "number",
          initialValue: 0,
        },
        {
          name: "total",
          title: "Total",
          type: "number",
          initialValue: 0,
        },
      ],
    },
  ],
};
