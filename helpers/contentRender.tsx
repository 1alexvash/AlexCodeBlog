import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { remark } from "remark";
import html from "remark-html";
import prism from "remark-prism";

export const documentsDirectory = join(process.cwd(), "content/posts");

export function getPostSlugs() {
  if (fs.existsSync(documentsDirectory)) {
    return fs.readdirSync(documentsDirectory);
  } else {
    return [];
  }
}

function JSONSerialize<Type>(data: Type): Type {
  return JSON.parse(JSON.stringify(data));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(documentsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return JSONSerialize({
    slug: "realSlug",
    data: "data",
    content: "content",
  });

  // const realSlug = slug.replace(/\.md$/, "");
  // const fullPath = join(documentsDirectory, `${realSlug}.md`);
  // const fileContents = fs.readFileSync(fullPath, "utf8");
  // const { data, content } = matter(fileContents);

  // type Items = {
  //   [key: string]: string;
  // };

  // const items: Items = {};

  // // Ensure only the minimal needed data is exposed
  // fields.forEach((field) => {
  //   if (field === "slug") {
  //     items[field] = realSlug;
  //   }
  //   if (field === "content") {
  //     items[field] = content;
  //   }

  //   if (typeof data[field] !== "undefined") {
  //     items[field] = data[field];
  //   }
  // });

  // return JSON.parse(JSON.stringify(items));
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();

  const posts = slugs.map((slug) => getPostBySlug(slug));
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return JSON.parse(JSON.stringify(posts));
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
}
