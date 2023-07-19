import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";
import type { NextApiRequest, NextApiResponse } from "next";

import { PostDocumentWithoutBody } from "../../../interfaces";
import client from ".tina/__generated__/client";

const sortFuturePosts = (
  futurePosts: PostDocumentWithoutBody[]
): PostDocumentWithoutBody[] => {
  return futurePosts.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostDocumentWithoutBody[]>
) {
  // const draftPosts = await client.queries.postsWithoutBody({
  //   filter: {
  //     draft: { eq: true },
  //   },
  // });

  const futurePosts = await client.queries.postsWithoutBody({
    filter: {
      date: { after: new Date(Date.now()).toString() },
    },
  });

  // const posts = sortFuturePosts(convertTypesAndGetEdges(futurePosts)).concat(
  //   convertTypesAndGetEdges(draftPosts)
  // );
  const posts = sortFuturePosts(convertTypesAndGetEdges(futurePosts));

  return res.status(200).json(posts);
}
