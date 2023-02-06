// TODO: remove this page, for testing only
import { useTina } from "tinacms/dist/react";

import client from ".tina/__generated__/client";

export default function Home(props: any) {
  // Pass our data through the "useTina" hook to make it editable
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  console.log("data:", data);

  // Note how our page body uses "data", and not the original "props.data".
  // This ensures that the content will be updated in edit-mode as the user types
  return <h1>{data.post.title}</h1>;
}

type Params = {
  params: {
    blog: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  console.log("params:", params);
  // const pageResponse = await client.queries.page({ relativePath: "home.mdx" });

  const relativePath = params.blog + ".md";
  console.log("relativePath:", relativePath);

  const postResponse = await client.queries.post({
    relativePath: params.blog + ".md",
  });
  console.log("postResponse:", postResponse);

  return {
    props: {
      data: postResponse.data,
      query: postResponse.query,
      variables: postResponse.variables,
    },
  };
};

export async function getStaticPaths() {
  const postListResponse = await client.queries.postConnection();

  const paths = postListResponse.data.postConnection.edges?.map((page) => ({
    params: {
      blog: page?.node?._sys.filename.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}
