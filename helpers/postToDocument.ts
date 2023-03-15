import { PostDocument, PostFromQuery } from "interfaces";

import filterNullElements from "./filterNullElements";

const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, featuredImage, tags, _sys, id } = post;

  if (!featuredImage || !tags) {
    return {
      date: "",
      draft: false,
      title: "",
      body: [],
      featuredImage: "",
      tags: [""],
      _sys,
      slug: "",
    };
  }

  const filterNullTags = tags.filter(filterNullElements);

  return {
    date,
    draft,
    title,
    body,
    featuredImage,
    tags: filterNullTags,
    _sys,
    slug: id,
  };
};

export default postToDocument;
