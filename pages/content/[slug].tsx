import { getAllPosts } from "helpers/contentRender";
import React from "react";

const ContentSlug = () => {
  return <div>ContentSlug</div>;
};

export async function getStaticPaths() {
  const posts: {
    slug: string;
  }[] = getAllPosts(["slug"]);
  console.log("posts:", posts);

  return {
    paths: [
      { params: { slug: "first-post" } },
      { params: { slug: "second-post" } },
    ],
    fallback: false,
  };
}

export const getStaticProps = async () => {
  return {
    props: { content: [{}, {}, {}, {}, {}] },
  };
};

export default ContentSlug;
