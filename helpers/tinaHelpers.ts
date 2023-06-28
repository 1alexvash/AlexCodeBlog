import { PostDocument, PostFromQuery } from "interfaces";

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
