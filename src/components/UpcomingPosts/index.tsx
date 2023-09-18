import { Box, Divider, Typography } from "@mui/material";
import { UpcomingPostsType } from "src/pages";

import Posts from "../Posts";
import StatisticsReferenceButton from "../StatisticsReferenceButton";
import { isPostInTheFuture } from "helpers/checkOfDraftOrFuturePost";
import SkeletonsList from "./Skeletons";

interface UpcomingPostsTemplateProps {
  posts: UpcomingPostsType;
  sectionName: "Drafts" | "Scheduled";
  statisticsButtonState?: boolean;
}

interface Props {
  posts: UpcomingPostsType;
}

const skeletonsCount = 3;

const UpcomingPostsTemplate = ({
  posts,
  sectionName,
  statisticsButtonState = true,
}: UpcomingPostsTemplateProps) => (
  <Box sx={{ mb: "50px" }}>
    <Typography
      sx={(theme) => ({
        color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
        lineHeight: 1.28,
        fontWeight: 700,
        fontSize: "43px",
        mb: 9,
        ["@media (max-width: 480px)"]: {
          fontSize: "28px",
        },
      })}
    >
      {sectionName}
    </Typography>
    <Posts posts={posts} skeletonsToRender={skeletonsCount} />
    <Box
      sx={{
        display: statisticsButtonState ? "flex" : "none",
        justifyContent: "end",
      }}
    >
      <StatisticsReferenceButton />
    </Box>
    <Divider sx={{ position: "absolute", width: "100%", left: 0 }} />
  </Box>
);

const UpcomingPosts = ({ posts }: Props) => {
  if (!posts) {
    return <SkeletonsList skeletonsToRender={skeletonsCount} />;
  }

  const draftPosts = posts.filter(
    (post) => post.draft && !isPostInTheFuture(post)
  );

  const scheduledPosts = posts.filter(
    (post) => isPostInTheFuture(post) && !post.draft
  );

  return (
    <>
      <UpcomingPostsTemplate
        posts={draftPosts}
        sectionName="Drafts"
        statisticsButtonState={false}
      />
      <UpcomingPostsTemplate posts={scheduledPosts} sectionName="Scheduled" />
    </>
  );
};

export default UpcomingPosts;
