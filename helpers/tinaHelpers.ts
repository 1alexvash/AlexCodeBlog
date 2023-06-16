import {
  PostDocument,
  PostDocumentWithoutBody,
  PostFromQuery,
  SystemInfo,
} from "interfaces";

import { PostQuery } from ".tina/__generated__/types";

const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, heroImage, tags, _sys, id } = post;

  return {
    date,
    draft,
    title,
    body,
    heroImage: heroImage ?? undefined,
    tags: tags ? (tags.filter((tag) => tag !== null) as string[]) : [],
    _sys,
    id,
  };
};

export const queryToDocument = (data: PostQuery): PostDocument => {
  const { post } = data;

  return postToDocument(post);
};

export const queriesToArrayOfDocuments = (
  posts: PostFromQuery[]
): PostDocument[] => {
  return posts.map((post) => postToDocument(post));
};

type PostFromQueryWithoutBody = {
  __typename?: "Post";
  id: string;
  title: string;
  date: string;
  heroImage?: string | null;
  draft: boolean;
  tags?: Array<string | null> | null;
  _sys: SystemInfo;
};

export type PostsFromQueryWithoutBody =
  | (PostFromQueryWithoutBody | null | undefined)[]
  | undefined;

export const postsQueryToPostsWithoutBody = (
  postsQuery: PostsFromQueryWithoutBody
): PostDocumentWithoutBody[] => {
  if (!postsQuery) {
    return [];
  }

  const filteredPostsQuery = postsQuery.filter(
    (postQuery): postQuery is PostFromQueryWithoutBody => postQuery !== null
  );

  return filteredPostsQuery.map((postQuery) => ({
    id: postQuery.id,
    title: postQuery.title,
    date: postQuery.date,
    heroImage: postQuery.heroImage ?? "",
    draft: postQuery.draft,
    tags: postQuery.tags
      ? postQuery.tags.filter((tag): tag is string => tag !== null)
      : [],
    _sys: postQuery._sys,
  }));
};
