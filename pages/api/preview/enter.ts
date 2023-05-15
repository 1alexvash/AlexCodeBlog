import { isUserAuthorized } from "@tinacms/auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.slug !== "string") {
    return res.status(400).json({ message: "Invalid slug" });
  }
  console.log("handler enter");
  if (process.env.NODE_ENV === "development") {
    // Enter preview-mode in local development
    console.log("development mode - entering preview mode");
    res.setPreviewData({});
    return res.redirect(req.query.slug);
  }

  // Check tina cloud token
  const isAuthorizedRes = await isUserAuthorized({
    token: `Bearer ${req.query.token}`,
    clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  });

  if (isAuthorizedRes) {
    console.log("production mode - entering preview mode");
    res.setPreviewData({});
    return res.redirect(req.query.slug);
  }

  return res.status(401).json({ message: "Invalid token" });
};

export default handler;
