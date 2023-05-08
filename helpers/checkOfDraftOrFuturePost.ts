import { PostDocumentWithoutBody } from "interfaces";

const today = new Date();

export function isPostADraft(post: PostDocumentWithoutBody) {
  if (post.draft) {
    return true;
  }
  return false;
}

export function isPostInTheFuture(post: { date: Date | string }) {
  const dateOfPost = new Date(post.date);
  if (today < dateOfPost) {
    return true;
  }
  return false;
}
