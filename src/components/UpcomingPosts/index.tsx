import { Box } from "@mui/material";
import { UpcomingPostsType } from "src/pages";

import { isPostInTheFuture } from "helpers/checkOfDraftOrFuturePost";
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
        darkIconPath="/images/draft-dark.png"
        lightIconPath="/images/draft-light.png"
        posts={draftPosts}
        sectionName="Drafts"
        showStatisticsButton={false}
      />
      <UpcomingPostsTemplate
        posts={scheduledPosts}
        sectionName="Scheduled"
        darkIconPath="/images/future-dark.png"
        lightIconPath="/images/future-light.png"
      />
    </>
  );
};

export default UpcomingPosts;
