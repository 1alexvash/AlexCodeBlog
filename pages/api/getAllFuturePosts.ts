import client from ".tina/__generated__/client";
import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postsQuery = await client.queries.postsWithoutBody({
    filter: {
      date: { after: new Date(Date.now()).toString() },
    },
  });
  const posts = convertTypesAndGetEdges(postsQuery);

  return res.status(200).json(posts);
}
