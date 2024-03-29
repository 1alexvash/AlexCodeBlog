import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import useWindowDimensions from "helpers/useWindowDimensions";
import React from "react";

import { PostsByMonthType } from ".";
import { calculateMarginBottom } from "./pageHelpers";
import styles from "./pageStyles";

const minColumnHeight = 1;
const pixelsHeightPerMonth = 30;
const noPostsPerMonth = 0;

const months = [
  { month: "January", season: "winter" },
  { month: "February", season: "winter" },
  { month: "March", season: "spring" },
  { month: "April", season: "spring" },
  { month: "May", season: "spring" },
  { month: "June", season: "summer" },
  { month: "July", season: "summer" },
  { month: "August", season: "summer" },
  { month: "September", season: "autumn" },
  { month: "October", season: "autumn" },
  { month: "November", season: "autumn" },
  { month: "December", season: "winter" },
];

const hasMonthPosts = (postsNumber: number): boolean => {
  return postsNumber > noPostsPerMonth;
};

const monthNameLength = (width: number, monthName: string): string => {
  const mobilePhoneWidthThreshold = 441;
  const smallDesktopWidthThreshold = 1260;

  if (width < mobilePhoneWidthThreshold) {
    return monthName.slice(0, 1);
  }

  if (width < smallDesktopWidthThreshold) {
    return monthName.slice(0, 3);
  }

  return monthName;
};

interface Props {
  postsByMonth: PostsByMonthType;
  postsAudioStatistic: {
    postsWithAudio: number;
    postsWithoutAudio: number;
  };
  postsNumber: number;
}

const YearStatistics = ({
  postsByMonth,
  postsAudioStatistic,
  postsNumber,
}: Props) => {
  const theme = useTheme();

  const { postsWithAudio, postsWithoutAudio } = postsAudioStatistic;

  const {
    monthlyDiagramWrapper,
    monthlyDiagramColumn,
    monthName,
    audioStatistics,
  } = styles(theme);

  const { width } = useWindowDimensions();

  const additionalStatistics = (
    <Box sx={audioStatistics}>
      <Box>🔈 Posts without audio: {postsWithoutAudio}</Box>
      <Box>🔊 Posts with audio: {postsWithAudio}</Box>
      <Box>📝 Total posts: {postsNumber}</Box>
    </Box>
  );

  return (
    <>
      {additionalStatistics}
      <Box sx={monthlyDiagramWrapper}>
        {months.map((column) => (
          <Box sx={monthlyDiagramColumn} key={column.month}>
            <Typography
              sx={calculateMarginBottom(postsByMonth[column.month], width)}
            >
              {postsByMonth[column.month] ?? noPostsPerMonth}
            </Typography>
            <Paper
              sx={{
                height: `${
                  hasMonthPosts(postsByMonth[column.month])
                    ? postsByMonth[column.month] * pixelsHeightPerMonth
                    : minColumnHeight
                }px`,
              }}
              square
            >
              <img
                src={`/images/${column.season}.svg`}
                alt={`${column.season}`}
                height={50}
                width={50}
              />
            </Paper>
          </Box>
        ))}
      </Box>
      <Box sx={monthName}>
        {months.map((month) => (
          <Box key={month.month}>{monthNameLength(width, month.month)}</Box>
        ))}
      </Box>
      <Divider sx={{ my: "30px" }} />
    </>
  );
};

export default YearStatistics;
