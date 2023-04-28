import { PostDocument, PostFromQuery } from "interfaces";

import { PostQuery } from ".tina/__generated__/types";

const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, heroImage, tags, _sys, id } = post;

  return {
    date,
    draft,
    title,
    body,
    heroImage: heroImage ?? "",
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
