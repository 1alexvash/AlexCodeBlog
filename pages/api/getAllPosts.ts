import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPostDocuments();

  setTimeout(() => {
    res.status(200).json(posts);
  }, 1000);
}
