import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.slug !== "string") {
    return res.status(400).json({ message: "Invalid slug" });
  }
  console.log("exit api handler", req.query.slug);
  res.clearPreviewData();
  res.redirect(req.query.slug);
};

export default handler;
