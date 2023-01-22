import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        // format: "md", // TODO: investigate whether it's an appropriate format
        // TODO: move to .mdx
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          // TODO: audio file
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true, // For some reason, this is not working
          },
          {
            type: "image",
            label: "Hero image",
            name: "featuredImage", // TODO: rename to heroImage
            required: false,
          },
          {
            name: "draft",
            label: "Draft",
            type: "boolean",
            required: true,
            description: "If this is checked the post will not be published",
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true,
            // TODO: At least one tag is required
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          defaultItem: {
            title: "",
            date: new Date().toISOString(),
            featuredImage: "",
            draft: false,
            tags: ["First Tag"],
          },
          filename: {
            readonly: true,
            slugify: (values) => {
              const date = new Date(values.date).toISOString().split("T")[0];
              const slug = values?.title?.toLowerCase().replace(/ /g, "-");

              return `${date}-${slug}`;
            },
          },
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
