import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";
import type { NextApiRequest, NextApiResponse } from "next";

import client from ".tina/__generated__/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const draftPosts = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: true },
    },
  });
  const futurePosts = await client.queries.postsWithoutBody({
    filter: {
      date: { after: new Date(Date.now()).toString() },
    },
  });

  const posts = convertTypesAndGetEdges(draftPosts).concat(
    convertTypesAndGetEdges(futurePosts)
  );

  return res.status(200).json(posts);
}
