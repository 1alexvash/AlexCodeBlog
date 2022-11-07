import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPostDocuments();

  res.status(200).json(posts);
}
