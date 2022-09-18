import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO: fix this
  // const posts = getAllPosts([
  //   "slug",
  //   "title",
  //   "featuredImage",
  //   "date",
  //   "draft",
  //   "tags",
  // ]).filter((post: PostDocumentWithoutContent) => post.draft === false);
  // res.status(200).json(posts);
}
