import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: true });
  return res.redirect("/admin/");
};

export default handler;
