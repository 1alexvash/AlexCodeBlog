import { getAllPostDocuments } from "helpers/markdownDocumentsReader";
import type { NextApiRequest, NextApiResponse } from "next";

export const VERSION = "v7";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Hello cloud function how are you doing? 🤔🤔🤔");

  try {
    const posts = getAllPostDocuments();
    res.status(200).json({
      posts,
      VERSION,
    });
  } catch (error) {
    res.status(404).json({
      error,
      message: "Some Error occured",
      VERSION,
    });
  }
}
