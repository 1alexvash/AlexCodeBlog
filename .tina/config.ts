import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  branch: "Tina-CMS",
  clientId: "c3e7b224-ca52-46a7-9bd6-c7f8c3777c7a",
  token: "0a7a09f1f7f6024a7919c096ca475683a2f2a730",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/post-images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "mdx",
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
            required: true,
          },
          {
            type: "image",
            label: "Hero image",
            name: "heroImage",
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true,
            ui: {
              min: 1,
            },
          },
        ],
        defaultItem: {
          title: "",
          date: new Date().toISOString(),
          draft: false,
          tags: ["First Tag"],
        },
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              const date = new Date(values.date).toISOString().split("T")[0];

              const titleWithoutSpecialCharacters = values.title.replace(
                /[^\w\s]/gi,
                ""
              );

              const slug = titleWithoutSpecialCharacters
                .toLowerCase()
                .replace(/ /g, "-");

              return `${date}-${slug}`;
            },
          },
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/post/${document._sys.filename}`,
        },
      },
    ],
  },
});
