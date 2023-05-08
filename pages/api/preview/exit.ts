import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setDraftMode({ enable: false });

  res.redirect(`http://${req.headers.host ?? ""}`);
};

export default handler;
