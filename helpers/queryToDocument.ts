import { PostDocument } from "interfaces";

import postToDocument from "./postToDocument";
import { PostQuery } from ".tina/__generated__/types";

const queryToDocument = (data: PostQuery): PostDocument => {
  const { post } = data;

  return postToDocument(post);
};

export default queryToDocument;
