import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse<void>) => {
  const protocol =
    process.env.NODE_ENV === "development" ? "http://" : "https://";

  res.setDraftMode({ enable: false });

  res.redirect(`${protocol}${req.headers.host ?? ""}`);
};

export default handler;
