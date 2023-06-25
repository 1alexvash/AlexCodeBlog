import { convertTypesAndGetEdges } from "helpers/getEdgeNodesHelpers";
import { PostDocumentWithoutBody } from "interfaces";
import type { GetStaticProps, NextPage } from "next";

import client from ".tina/__generated__/client";
import {
  MainConfigQuery,
  MainConfigQueryVariables,
} from ".tina/__generated__/types";
import HomePage from "@/components/HomePage";

const Home: NextPage<{
  homePagePosts: PostDocumentWithoutBody[];
  tinaData: MainConfigQuery;
  query: string;
  variables: MainConfigQueryVariables;
}> = ({ homePagePosts, tinaData, query, variables }) => {
  return (
    <HomePage
      homePagePosts={homePagePosts}
      tinaData={tinaData}
      query={query}
      variables={variables}
    />
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const homePagePosts = await client.queries.postsWithoutBody({
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
      homePagePosts: convertTypesAndGetEdges(homePagePosts),
      tinaData: data,
      query,
      variables,
    },
  };
};

export default Home;
