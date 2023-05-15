import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();
  res.redirect(typeof req.query.slug === "string" ? req.query.slug : "/");
};

export default handler;
