import { Box } from "@mui/material";
import { isPostInTheFuture } from "helpers/checkOfDraftOrFuturePost";
import { UpcomingPostsType } from "src/pages";

import SkeletonsList from "./Skeletons";
import UpcomingPostsTemplate from "./UpcomingPostsTemplate";

interface Props {
  posts: UpcomingPostsType;
}

export const skeletonsCount = 3;

const UpcomingPosts = ({ posts }: Props) => {
  if (!posts) {
    return (
      <Box sx={{ mt: "120px" }}>
        <SkeletonsList skeletonsToRender={skeletonsCount} />
      </Box>
    );
  }

  const draftPosts = posts.filter((post) => post.draft);

  const scheduledPosts = posts.filter(
    (post) => isPostInTheFuture(post) && !post.draft
  );

  return (
    <>
      <UpcomingPostsTemplate
        posts={draftPosts}
        sectionName="Drafts"
        showStatisticsButton={false}
      />
      <UpcomingPostsTemplate posts={scheduledPosts} sectionName="Scheduled" />
    </>
  );
};

export default UpcomingPosts;
