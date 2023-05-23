import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.slug !== "string") {
    return res.status(400).json({ message: "Invalid slug" });
  }

  res.setPreviewData({});
  return res.redirect(req.query.slug);
};

export default handler;
