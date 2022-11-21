import { PostDocumentWithoutContent } from "interfaces";

const today = new Date();

export function isPostADraft(post: PostDocumentWithoutContent) {
  if (post.draft) {
    return true;
  } else {
    return false;
  }
}

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
//THIS IS ⬆️ FOR TESTING, DON't MERGE IT
export function isPostInTheFuture(post: { date: Date | string }) {
  if (today.toISOString() < post.date.toString()) {
    return true;
  } else {
    return false;
  }
}
