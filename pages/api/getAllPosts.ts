// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts } from "helpers/contentRender";
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "pages";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts = getAllPosts([
    "slug",
    "title",
    "featuredImage",
    "date",
    "draft",
    "tags",
  ]).filter((post: Post) => post.draft === false);
  res.status(200).json(posts);
}
