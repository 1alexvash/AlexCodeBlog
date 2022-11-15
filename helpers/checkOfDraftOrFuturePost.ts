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
  if (today.toISOString() < post.date.toString()) {
    return true;
  } else {
    return false;
  }
}
