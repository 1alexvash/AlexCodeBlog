import { PostDocument, PostFromQuery } from "interfaces";

import postToDocument from "./postToDocument";

const queriesToArrayOfDocuments = (posts: PostFromQuery[]): PostDocument[] => {
  return posts.map((post) => postToDocument(post));
};

export default queriesToArrayOfDocuments;
