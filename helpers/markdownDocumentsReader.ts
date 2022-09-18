import fs from "fs";
import matter from "gray-matter";
import { PostDocument, PostDocumentWithoutContent } from "interfaces";
import { join } from "path";

const documentsDirectory = join(process.cwd(), "content/posts");

function JSONSerialize<Type>(data: Type): Type {
  return JSON.parse(JSON.stringify(data));
}

export function getPostSlugs() {
  if (fs.existsSync(documentsDirectory)) {
    return fs.readdirSync(documentsDirectory);
  } else {
    return [];
  }
}

export function getPostDocumentBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(documentsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return JSONSerialize({ slug: realSlug, ...data, content }) as PostDocument;
}

export function getAllPostDocuments(): PostDocumentWithoutContent[] {
  const slugs = getPostSlugs();
  const docs = slugs
    .map((slug) => getPostDocumentBySlug(slug))
    .filter((post: PostDocument) => post.draft === false)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .map((post) => {
      // eslint-disable-next-line no-unused-vars
      const { content, ...postWithoutContent } = post;
      return postWithoutContent;
    });

  return JSONSerialize(docs);
}
