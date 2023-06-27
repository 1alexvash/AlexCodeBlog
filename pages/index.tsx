import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";
import { PostDocumentWithoutBody } from "interfaces";
import type { GetStaticProps, NextPage } from "next";

import HomePage from "@/components/HomePage";

import client from ".tina/__generated__/client";
import {
  MainConfigQuery,
  MainConfigQueryVariables,
} from ".tina/__generated__/types";

const Home: NextPage<{
  posts: PostDocumentWithoutBody[];
  tinaData: MainConfigQuery;
  query: string;
  variables: MainConfigQueryVariables;
}> = ({ posts, tinaData, query, variables }) => (
  <HomePage
    homePagePosts={posts}
    tinaData={tinaData}
    query={query}
    variables={variables}
  />
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.queries.postsWithoutBody({
    filter: {
      draft: { eq: false },
      date: { before: new Date(Date.now()).toString() },
    },
  });

  const { data, query, variables } = await client.queries.mainConfig({
    relativePath: "mainConfig.json",
  });

  return {
    props: {
      posts: convertTypesAndGetEdges(posts),
      tinaData: data,
      query,
      variables,
    },
  };
};

export default Home;
