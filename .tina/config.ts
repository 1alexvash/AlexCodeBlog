import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  branch: "Tina-CMS",
  clientId: "c3e7b224-ca52-46a7-9bd6-c7f8c3777c7a",
  token: "351c04276ed1059a64f12ee7ade4c2fab8e11562",
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
        name: "main_config",
        label: "Main config",
        path: "content",
        format: "json",
        fields: [
          {
            name: "site_title",
            label: "Site title",
            type: "string",
            required: true,
          },
          {
            name: "site_description",
            label: "Site description",
            type: "string",
            required: true,
          },
          {
            name: "site_keywords",
            label: "Site keywords",
            list: true,
            type: "string",
            required: true,
          },
          {
            name: "author_name",
            label: "Author name",
            type: "string",
            required: true,
          },
          {
            name: "author_position",
            label: "Author position",
            type: "string",
            required: true,
          },
          {
            name: "social_links",
            label: "Social links",
            type: "object",
            list: true,
            required: true,
            fields: [
              {
                name: "link",
                label: "Link",
                type: "string",
                required: true,
              },
              {
                name: "image",
                label: "Image",
                type: "string",
                required: true,
              },
              {
                name: "width",
                label: "Width",
                type: "number",
                required: true,
              },
              {
                name: "height",
                label: "Height",
                type: "number",
                required: true,
              },
              {
                name: "class",
                label: "Class",
                type: "string",
              },
            ],
          },
          {
            name: "host_url",
            label: "Host url",
            type: "string",
            required: true,
          },
          {
            name: "posts_per_page",
            label: "Posts per page",
            type: "number",
            required: true,
          },
          {
            name: "latest_posts_per_page",
            label: "Latest posts per page",
            type: "number",
            required: true,
          },
          {
            name: "default_image",
            label: "Default image",
            type: "string",
            required: true,
          },
        ],
      },
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
