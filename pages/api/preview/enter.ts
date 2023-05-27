import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: true });
  return res.redirect(307, "/admin"); // Use status code 307 for the redirect
};

export default handler;
