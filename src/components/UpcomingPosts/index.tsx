import { Box, Divider, Typography } from "@mui/material";
import { UpcomingPostsType } from "src/pages";

import Posts from "../Posts";
import StatisticsReferenceButton from "../StatisticsReferenceButton";
import { isPostInTheFuture } from "helpers/checkOfDraftOrFuturePost";
import SkeletonsList from "./Skeletons";
import Image from "next/image";
import { useTheme } from "next-themes";

interface UpcomingPostsTemplateProps {
  posts: UpcomingPostsType;
  sectionName: "Drafts" | "Scheduled";
  showStatisticsButton?: boolean;
  lightIconPath: "/images/future-light.png" | "/images/draft-light.png";
  darkIconPath: "/images/future-dark.png" | "/images/draft-dark.png";
}

interface Props {
  posts: UpcomingPostsType;
}

const skeletonsCount = 3;

const UpcomingPostsTemplate = ({
  posts,
  sectionName,
  showStatisticsButton: statisticsButtonState = true,
  darkIconPath,
  lightIconPath,
}: UpcomingPostsTemplateProps) => {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return null;
  }

  return (
    <Box sx={{ mb: "50px" }}>
      <Typography
        sx={(theme) => ({
          color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
          lineHeight: 1.28,
          fontWeight: 700,
          fontSize: "43px",
          display: "flex",
          gap: "5px",
          mb: 9,
          ["@media (max-width: 480px)"]: {
            fontSize: "28px",
          },
        })}
      >
        {sectionName}
        <Image
          src={resolvedTheme === "light" ? darkIconPath : lightIconPath}
          alt="icon"
          width={48}
          height={48}
        />
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
};

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
