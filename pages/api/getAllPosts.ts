import type { NextApiRequest, NextApiResponse } from "next";

import client from ".tina/__generated__/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await client.queries.postConnection({});

  res
    .status(200)
    .json(posts.data.postConnection.edges?.map((edge) => edge?.node).reverse());
}
