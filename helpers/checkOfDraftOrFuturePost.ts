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
  const dateOfPost = new Date(post.date);
  console.log("dateOfPost", dateOfPost);
  console.log("today", today);
  if (today < dateOfPost) {
    return true;
  } else {
    return false;
  }
}

console.log(isPostInTheFuture({ date: tomorrow }));
console.log(isPostInTheFuture({ date: yesterday }));
//THIS IS ⬆️ FOR TESTING, DON't MERGE IT
