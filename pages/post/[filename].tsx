import config from "config";
import fs from "fs";
import matter from "gray-matter";
import markdownToHtml from "helpers/markdownToHtml";
import { PostDocument } from "interfaces";
import Head from "next/head";
import { join } from "path";
import { useTina } from "tinacms/dist/react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogPostSectionWrapper from "@/components/Post/BlogPostSectionWrapper";
import BreadCrumbs from "@/components/Post/BreadCrumbs";
import LatestPosts from "@/components/Post/LatestPosts";
import PageProgress from "@/components/Post/PageProgress";
import PostContent from "@/components/Post/PostContent";
import StandWithUkraine from "@/components/StandWithUkraine";

import { client } from "../../.tina/__generated__/client";

interface Props {
  data: any;
  query: any;
  variables: any;
  latestPosts: any[]; // The interface is broken by graphql
}

const Post = ({ latestPosts, ...props }: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  console.log(data.content);
  return (
    <>
      <Head>
        <title>{data.post.title}</title>
        <meta name="description" content={config.site_description} />
        <meta property="og:description" content={config.site_description} />
        <meta property="og:url" content={config.host_url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.site_title} />
        <meta property="og:image" content={config.defaultImage} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandWithUkraine />
      <Header />
      <BreadCrumbs title={data.post.title} />
      <PageProgress />
      <BlogPostSectionWrapper>
        <PostContent post={data.post} content={data.content} />
        <LatestPosts latestPosts={latestPosts} />
      </BlogPostSectionWrapper>
      <Footer />
    </>
  );
};

type Params = {
  params: {
    filename: string;
  };
};

function JSONSerialize<Type>(data: Type): Type {
  return JSON.parse(JSON.stringify(data));
}

const documentsDirectory = join(process.cwd(), "content/posts");

export function getPostDocumentBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(documentsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return JSONSerialize({ slug: realSlug, ...data, content }) as PostDocument;
}

export async function getStaticProps({ params }: Params) {
  const relativePath = params.filename + ".md";

  const postDocument = getPostDocumentBySlug(params.filename);

  const content = await markdownToHtml(postDocument.content || "");

  const postResponse = await client.queries.post({ relativePath });

  const latestPosts = await client.queries.postConnection({
    last: config.latest_posts_per_page,
  });

  return {
    props: {
      post: postResponse.data.post,
      latestPosts: latestPosts.data.postConnection.edges?.map(
        (edge) => edge?.node
      ),

      data: postResponse.data,
      query: postResponse.query,
      variables: postResponse.variables,
      content,
    },
  };
}

export async function getStaticPaths() {
  const postListResponse = await client.queries.postConnection();

  const paths = postListResponse.data.postConnection.edges?.map((page) => ({
    params: {
      filename: page?.node?._sys.filename.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default Post;
