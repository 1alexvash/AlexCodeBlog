import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";
import { PostDocumentWithoutBody } from "interfaces";
import { GetStaticProps, NextPage } from "next";

import HomePage from "@/components/HomePage";

import client from ".tina/__generated__/client";
import {
  MainConfigQuery,
  MainConfigQueryVariables,
} from ".tina/__generated__/types";

interface Props {
  homePagePosts: PostDocumentWithoutBody[];
  tinaData: MainConfigQuery;
  query: string;
  variables: MainConfigQueryVariables;
  upcomingPosts: PostDocumentWithoutBody[];
}

const AdminPortal: NextPage<Props> = ({
  homePagePosts,
  query,
  tinaData,
  upcomingPosts,
  variables,
}) => (
  <HomePage
    homePagePosts={homePagePosts}
    isEditorMode
    query={query}
    tinaData={tinaData}
    upcomingPosts={upcomingPosts}
    variables={variables}
  />
);

export const getStaticProps: GetStaticProps = async () => {
  const homePagePosts = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: false },
      date: { before: new Date(Date.now()).toString() },
    },
  });

  const upcomingDraftPosts = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: true },
    },
  });

  const upcomingFuturePosts = await client.queries.postsWithoutBody({
    filter: {
      date: { after: new Date(Date.now()).toString() },
      draft: { eq: false },
    },
  });

  const upcomingPosts: PostDocumentWithoutBody[] = Array.prototype
    .concat(
      convertTypesAndGetEdges(upcomingDraftPosts),
      convertTypesAndGetEdges(upcomingFuturePosts)
    )
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const { data, query, variables } = await client.queries.mainConfig({
    relativePath: "mainConfig.json",
  });

  return {
    props: {
      homePagePosts: convertTypesAndGetEdges(homePagePosts),
      upcomingPosts,
      tinaData: data,
      query,
      variables,
    },
  };
};

export default AdminPortal;
