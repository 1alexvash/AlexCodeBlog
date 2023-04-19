import { PostDocument, PostFromQuery } from "interfaces";

import filterNullElements from "./filterNullElements";

const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, heroImage, tags, _sys, id } = post;

  const filterNullTags = tags ? tags.filter(filterNullElements) : [];

  return {
    date,
    draft,
    title,
    body,
    heroImage: heroImage ?? "",
    tags: filterNullTags,
    _sys,
    id,
  };
};

export default postToDocument;
