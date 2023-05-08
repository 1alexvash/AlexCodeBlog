import { NextApiRequest, NextApiResponse } from "next";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.query.secret !== process.env.TINA_PREVIEW_SECRET) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  res.setPreviewData({});

  res.writeHead(307, { Location: req.query.slug || "/" });
  res.end();
}
