import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import type { NextApiRequest, NextApiResponse } from "next";

export const VERSION = "v2";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPostDocuments();

  console.log("Hello cloud function how are you doing? 🤔🤔🤔");

  res.status(200).json({ posts, VERSION });
}
