import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<void>) => {
  const protocol =
    process.env.NODE_ENV === "development" ? "http://" : "https://";

  const baseurl = `${protocol}${req.headers.host ?? ""}/admin`;

  res.setDraftMode({ enable: true });
  res.redirect(baseurl);
};

export default handler;
