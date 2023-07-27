import {
  PostDocument,
  PostDocumentWithoutBody,
  PostFromQuery,
  SystemInfo,
} from "interfaces";

export const isDefined = <T>(value: T | undefined): value is T => {
  return typeof value !== "undefined";
};

export const isNotNull = <T>(value: T | null): value is T => {
  return value !== null;
};

export const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, heroImage, tags, _sys, id, audioVersion } =
    post;

  return {
    audioVersion: audioVersion ?? null,
    date,
    draft,
    title,
    body,
    heroImage: heroImage ?? undefined,
    tags: tags ? tags.filter(isNotNull) : [],
    _sys,
    id,
  };
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
  audioVersion?: string | null;
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
    heroImage: postQuery.heroImage ?? null,
    draft: postQuery.draft,
    tags: postQuery.tags
      ? postQuery.tags.filter((tag): tag is string => tag !== null)
      : [],
    _sys: postQuery._sys,
    audioVersion: postQuery.audioVersion,
  }));
};
