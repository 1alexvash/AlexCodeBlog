import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: true });
  return res.redirect("/admin/");
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler;
