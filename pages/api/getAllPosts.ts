// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  documentsDirectory,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "helpers/contentRender";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts([
    "slug",
    "title",
    "featuredImage",
    "date",
    "draft",
    "tags",
  ]);

  const postSlugs = getPostSlugs();
  const aSinglePostExample = getPostBySlug("markdown-example.md", [
    "slug",
    "title",
  ]);

  res.status(200).json({
    posts,
    postSlugs,
    version: 12,
    // aSinglePostExample,
    // documentsDirectory,
  });
}
