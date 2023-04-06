import type { NextApiRequest, NextApiResponse } from "next";

import client from ".tina/__generated__/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postsQuery = await client.queries.postConnection({});
  const posts = postsQuery.data.postConnection.edges
    ?.map((edge) => edge?.node)
    .reverse();

  res.status(200).json(posts);
}
