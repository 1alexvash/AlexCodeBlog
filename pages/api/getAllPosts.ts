// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts, getPostSlugs } from "helpers/contentRender";
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

  res.status(200).json({
    posts,
    postSlugs,
    version: 6,
  });
}
