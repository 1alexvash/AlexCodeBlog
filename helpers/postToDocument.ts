import { PostDocument, PostFromQuery } from "interfaces";

const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, featuredImage, tags, _sys, id } = post;

  if (!featuredImage) {
    return {
      date: "",
      draft: false,
      title: "",
      body: [],
      featuredImage: "",
      tags: [""],
      _sys,
      id: "",
    };
  }

  return {
    date,
    draft,
    title,
    body,
    featuredImage,
    tags,
    _sys,
    id,
  };
};

export default postToDocument;
