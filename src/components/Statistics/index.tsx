import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { PostDocumentWithoutBody } from "interfaces";
import dynamic from "next/dynamic";
import { useState } from "react";

import {
  getAudioPostStatistics,
  getPostsByYearAndMonth,
  getYears,
} from "./pageHelpers";
import styles from "./pageStyles";

export type PostsByMonthType = {
  [month: string]: number;
};

interface Props {
  posts: PostDocumentWithoutBody[];
}

const currentYear = new Date().getUTCFullYear();

const YearStatistics = dynamic(() => import("./YearStatistics"), {
  ssr: false,
  loading: () => (
    <>
      <Skeleton
        variant="rectangular"
        sx={{ width: "200px", height: "37px", mb: "30px" }}
      />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "385px" }} />
    </>
  ),
});

const StatisticPage = ({ posts }: Props) => {
  const theme = useTheme();

  const years = getYears(posts);

  const [postsByMonth, setPostsByMonth] = useState<PostsByMonthType>(
    getPostsByYearAndMonth(currentYear, posts)
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { pageTitle, pageControlsAlign, yearButtonStyle } = styles(theme);

  const handleYearClick = (year: number) => {
    setPostsByMonth(getPostsByYearAndMonth(year, posts));
    setSelectedYear(year);
  };

  const postsAudioStatistic = getAudioPostStatistics(posts, selectedYear);

  const yearActiveStyles = (isActiveYear: boolean) => {
    const colorsPalette = theme.palette.main;

    let backgroundColor, color;

    if (isActiveYear) {
      backgroundColor = colorsPalette.orange;
      color = colorsPalette.white;
    } else if (theme.palette.mode === "light") {
      backgroundColor = colorsPalette.lightGrey;
      color = colorsPalette.black;
    } else if (theme.palette.mode === "dark") {
      backgroundColor = colorsPalette.grey;
      color = colorsPalette.white;
    }

    return {
      backgroundColor,
      color,
    };
  };

  const pageControls = (
    <Box
      sx={[
        pageControlsAlign,
        {
          "& div": yearButtonStyle,
        },
      ]}
    >
      {years.map((year) => (
        <Box
          sx={yearActiveStyles(selectedYear === year)}
          onClick={() => handleYearClick(year)}
          key={year}
        >
          {year}
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <Typography sx={pageTitle}>Statistics</Typography>
      {pageControls}

      <YearStatistics
        postsByMonth={postsByMonth}
        postsAudioStatistic={postsAudioStatistic}
      />
    </>
  );
};

export default StatisticPage;
