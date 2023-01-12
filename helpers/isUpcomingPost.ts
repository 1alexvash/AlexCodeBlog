import { PostDocumentWithoutContent } from "interfaces";

import { isPostADraft, isPostInTheFuture } from "./checkOfDraftOrFuturePost";

export default function isUpcomingPost(post: PostDocumentWithoutContent) {
  return isPostADraft(post) || isPostInTheFuture(post);
}
