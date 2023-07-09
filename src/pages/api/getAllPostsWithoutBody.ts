import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";
import { PostDocumentWithoutBody } from "interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

import client from ".tina/__generated__/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostDocumentWithoutBody[]>
) {
  const postsQuery = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: false },
      date: { before: new Date(Date.now()).toString() },
    },
  });
  const posts = convertTypesAndGetEdges(postsQuery);

  return res.status(200).json(posts);
}
