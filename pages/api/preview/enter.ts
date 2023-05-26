import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: true });
  res.setHeader("Location", "/admin");
  res.status(307).end();
};

export default handler;
