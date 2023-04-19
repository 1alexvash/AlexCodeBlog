import { PostDocument, PostFromQuery } from "interfaces";

import postToDocument from "./postToDocument";
import { PostQuery } from ".tina/__generated__/types";

export const queryToDocument = (data: PostQuery): PostDocument => {
  const { post } = data;

  return postToDocument(post);
};

export const queriesToArrayOfDocuments = (
  posts: PostFromQuery[]
): PostDocument[] => {
  return posts.map((post) => postToDocument(post));
};
