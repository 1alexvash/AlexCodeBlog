import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: true });

  res.redirect(307, "/admin/index.html");
};

export default handler;
