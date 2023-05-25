import { isUserAuthorized } from "@tinacms/auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV === "development") {
    res.setDraftMode({ enable: true });
    return res.redirect("/admin");
  }

  console.log("req.query.token", req.query.token);
  const isAuthorizedRes = await isUserAuthorized({
    token: `Bearer ${req.query.token}`,
    clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  });

  if (isAuthorizedRes) {
    res.setDraftMode({ enable: true });
    return res.redirect("/admin");
  }

  return res.status(401).json({ message: "Invalid token" });
};

export default handler;
