import { PostDocument, PostFromQuery } from "interfaces";

import filterNullElements from "./filterNullElements";

const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, heroImage, tags, _sys, id } = post;

  if (!heroImage || !tags) {
    return {
      date: "",
      draft: false,
      title: "",
      body: [],
      heroImage: "",
      tags: [""],
      _sys,
      id: "",
    };
  }

  const filterNullTags = tags.filter(filterNullElements);

  return {
    date,
    draft,
    title,
    body,
    heroImage,
    tags: filterNullTags,
    _sys,
    id,
  };
};

export default postToDocument;
