import { PostDocumentWithoutBody } from "interfaces";

import { isPostADraft, isPostInTheFuture } from "./checkOfDraftOrFuturePost";

export default function isUpcomingPost(post: PostDocumentWithoutBody) {
  return isPostADraft(post) || isPostInTheFuture(post);
}
