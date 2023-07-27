import { PostDocumentWithoutBody } from "interfaces";

import { pageNamesList } from "../src/components/Header";
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

const getEdgeNodes = (
  tinaData: postWithoutBodyData
): PostsFromQueryWithoutBody => {
  return tinaData.data.postConnection.edges
    ?.map((edge) => edge?.node)
    .reverse();
};

export const convertTypesAndGetEdges = (
  tinaData: postWithoutBodyData
): PostDocumentWithoutBody[] => {
  return postsQueryToPostsWithoutBody(getEdgeNodes(tinaData)).filter(
    (post) => !pageNamesList.includes(post.title)
  );
};
