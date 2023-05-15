import { PostDocumentWithoutBody } from "interfaces";

import {
  PostsFromQueryWithoutBody,
  postsQueryToPostsWithoutBody,
} from "./tinaHelpers";
import {
  PostsWithoutBodyQuery,
  PostsWithoutBodyQueryVariables,
} from ".tina/__generated__/types";

type postWithoutBodyData = {
  data: PostsWithoutBodyQuery;
  variables: PostsWithoutBodyQueryVariables;
  query: string;
};

export const getEdgeNodes = (
  tinaData: postWithoutBodyData | never[]
): PostsFromQueryWithoutBody => {
  if (Array.isArray(tinaData)) {
    return [];
  }

  return tinaData.data.postConnection.edges
    ?.map((edge) => edge?.node)
    .reverse();
};

export const convertTypesAndGetEdges = (
  tinaData: postWithoutBodyData | never[]
): PostDocumentWithoutBody[] => {
  return postsQueryToPostsWithoutBody(getEdgeNodes(tinaData));
};
