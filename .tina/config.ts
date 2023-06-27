import { defineConfig } from "tinacms";

const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

const tokenForEveryBranch = "351c04276ed1059a64f12ee7ade4c2fab8e11562";

export default defineConfig({
  branch,
  clientId: "c3e7b224-ca52-46a7-9bd6-c7f8c3777c7a",
  token: tokenForEveryBranch,
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
        name: "mainConfig",
        label: "Main config",
        path: "content",
        format: "json",
        fields: [
          {
            name: "siteDescription",
            label: "Site description",
            type: "rich-text",
            isBody: true,
          },
          {
            name: "defaultImage",
            label: "Default image",
            type: "string",
            required: true,
          },
          {
            name: "authorName",
            label: "Author name",
            type: "string",
            required: true,
          },
          {
            name: "authorPosition",
            label: "Author position",
            type: "string",
            required: true,
          },
          {
            name: "socialLinks",
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
                name: "class",
                label: "Class",
                type: "string",
              },
            ],
          },
          {
            name: "siteTitle",
            label: "Site title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "siteKeywords",
            label: "Site keywords",
            list: true,
            type: "string",
            required: true,
            ui: {
              min: 1,
            },
          },

          {
            name: "postsPerPage",
            label: "Posts per page",
            type: "number",
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
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
            ui: {
              parse: (value) => value && value.format("YYYY-MM-DD"),
            },
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
            type: "string",
            name: "audioVersion",
            label: "Audio version(Vocaro)",
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
        defaultItem: () => ({
          title: "",
          date: new Date().toISOString(),
          draft: false,
          tags: ["First Tag"],
        }),
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
          router: ({ document }) => `/post/${document._sys.filename}`,
        },
      },
    ],
  },
});
