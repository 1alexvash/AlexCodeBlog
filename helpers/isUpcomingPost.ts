import { PostDocumentWithoutContent } from "interfaces";

import { isPostADraft, isPostInTheFuture } from "./checkOfDraftOrFuturePost";

export function isUpcomingPost(post: PostDocumentWithoutContent) {
  if (isPostADraft(post) || isPostInTheFuture(post)) {
    return true;
  } else return false;
}
