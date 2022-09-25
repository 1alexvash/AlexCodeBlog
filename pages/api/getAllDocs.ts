import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import type { NextApiRequest, NextApiResponse } from "next";

import { VERSION } from "./getAllPosts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPostDocuments();

  res.status(200).json({ posts, VERSION });
}
