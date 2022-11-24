import { PostDocumentWithoutContent } from "interfaces";

const today = new Date();

export function isPostADraft(post: PostDocumentWithoutContent) {
  if (post.draft) {
    return true;
  } else {
    return false;
  }
}

export function isPostInTheFuture(post: { date: Date | string }) {
  const dateOfPost = new Date(post.date);
  if (today < dateOfPost) {
    return true;
  } else {
    return false;
  }
}
