import { PostDocumentWithoutContent } from "interfaces";

import { isPostADraft, isPostInTheFuture } from "./checkOfDraftOrFuturePost";

export function isUpcomingPost(post: PostDocumentWithoutContent) {
  return isPostADraft(post) || isPostInTheFuture(post);
}
