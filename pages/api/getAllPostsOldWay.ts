// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts } from "helpers/contentRender";
import type { NextApiRequest, NextApiResponse } from "next";
import { VERSION } from "./getAllPostsNewWay";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts([
    "slug",
    "title",
    "featuredImage",
    "date",
    "draft",
    "tags",
  ]).filter((post: any) => post.draft === false);
  res.status(200).json({
    posts,
    VERSION,
  });
}
