import getEdgeNodes from "helpers/getEdgeNodes";
import { postsQueryToPostsWithoutBody } from "helpers/tinaHelpers";
import { PostDocumentWithoutBody } from "interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

import client from ".tina/__generated__/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostDocumentWithoutBody[]>
) {
  const postsQuery = await client.queries.postsWithoutBody({});
  const posts = getEdgeNodes(postsQuery);

  return res.status(200).json(postsQueryToPostsWithoutBody(posts));
}
