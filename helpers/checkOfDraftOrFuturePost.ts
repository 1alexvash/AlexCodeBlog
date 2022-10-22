import { PostDocumentWithoutContent } from "interfaces";

const today = new Date();

export function isPostADraft(post: PostDocumentWithoutContent) {
  if (post.draft === false) {
    return false;
  } else {
    return true;
  }
}

export function isPostInTheFuture(post: PostDocumentWithoutContent) {
  if (today.toISOString() > post.date) {
    return true;
  } else {
    return false;
  }
}
