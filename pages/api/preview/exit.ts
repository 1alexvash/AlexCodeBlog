import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: false });
  res.redirect("/");
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler;
