// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts } from "helpers/contentRender";
import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import type { NextApiRequest, NextApiResponse } from "next";

export const VERSION = 20;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts([
    "slug",
    "title",
    "featuredImage",
    "date",
    "draft",
    "tags",
  ]);

  res.status(200).json({
    posts,
    VERSION,
  });
}
