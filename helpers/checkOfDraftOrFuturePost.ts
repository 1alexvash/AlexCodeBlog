import { PostDocument } from "interfaces";

const today = new Date();

export function isPostADraft(post: PostDocument) {
  if (post.draft === false) {
    return false;
  } else {
    return true;
  }
}

export function isPostInTheFuture(post: PostDocument) {
  if (today.toISOString() > post.date) {
    return true;
  } else {
    return false;
  }
}
