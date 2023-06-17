import { PostDocument, PostFromQuery } from "interfaces";

export const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, heroImage, tags, _sys, id, audioVersion } =
    post;

  return {
    audioVersion: audioVersion ?? "",
    date,
    draft,
    title,
    body,
    heroImage: heroImage ?? undefined,
    tags: tags ? (tags.filter((tag) => tag !== null) as string[]) : [],
    _sys,
    id,
  };
};

export const queriesToArrayOfDocuments = (
  posts: PostFromQuery[]
): PostDocument[] => {
  return posts.map((post) => postToDocument(post));
};
