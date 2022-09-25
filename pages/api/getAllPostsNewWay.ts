import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import type { NextApiRequest, NextApiResponse } from "next";

const VERSION = "v1";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPostDocuments();

  res.status(200).json({ posts, VERSION });
}
