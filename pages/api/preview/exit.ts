import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: false });
  res.redirect("/");
};

export default handler;
