import { PostDocument, PostFromQuery } from "interfaces";

import { PostQuery } from ".tina/__generated__/types";

export const isDefined = <T>(value: T | undefined): value is T => {
  return typeof value !== "undefined";
};

export const isNotNull = <T>(value: T | null): value is T => {
  return value !== null;
};

const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, heroImage, tags, _sys, id } = post;

  return {
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

export const queryToDocument = (data: PostQuery): PostDocument => {
  const { post } = data;

  return postToDocument(post);
};

export const queriesToArrayOfDocuments = (
  posts: PostFromQuery[]
): PostDocument[] => {
  return posts.map((post) => postToDocument(post));
};
