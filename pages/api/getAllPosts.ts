import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPostDocuments(false);

  res.status(200).json(posts);
}
