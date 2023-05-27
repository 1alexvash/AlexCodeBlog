// /api/preview/exit.ts
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: false });

  const next = req.query.next || "/"; // Default to root URL if `next` query parameter is not provided
  return res.redirect(typeof next !== "string" ? "" : next);
};

export default handler;
