import client from ".tina/__generated__/client";
import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postsQuery = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: false },
    },
  });
  const posts = convertTypesAndGetEdges(postsQuery);

  return res.status(200).json(posts);
}
