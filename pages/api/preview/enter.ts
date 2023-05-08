import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const baseurl = `http://${req.headers.host ?? ""}/admin`;

  res.setDraftMode({ enable: true });
  return res.redirect(baseurl);
};

export default handler;
