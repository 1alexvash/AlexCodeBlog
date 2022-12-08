import { getUpcomingPosts } from "helpers/markdownDocumentsReader";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getUpcomingPosts();

  res.status(200).json(posts);
}
