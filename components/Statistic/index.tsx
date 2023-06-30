import { Box, Typography, useTheme } from "@mui/material";
import { PostDocumentWithoutBody } from "interfaces";
import { useState } from "react";

import { getPostsByYearAndMonth, getYearsArray } from "./pageHelpers";
import styles from "./pageStyles";
import YearStatistics from "./YearStatistics";

export type PostsByMonthType = { [month: string]: number };

interface Props {
  posts: PostDocumentWithoutBody[];
}

const currentYear = new Date().getUTCFullYear();

const StatisticPage = ({ posts }: Props) => {
  const theme = useTheme();

  const yearsArray = getYearsArray(posts);

  const [postsByMonth, setPostsByMonth] = useState<PostsByMonthType>(
    getPostsByYearAndMonth(currentYear, posts)
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { pageTitle, pageControlsAlign, yearButtonStyle } = styles(theme);

  const handleYearClick = (year: number) => {
    setPostsByMonth(getPostsByYearAndMonth(year, posts));
    setSelectedYear(year);
  };

  const yearActiveStyles = (isActiveYear: boolean) => {
    const colorsPalette = theme.palette.main;

    let backgroundColor, color;

    if (isActiveYear) {
      backgroundColor = colorsPalette.orange;
      color = colorsPalette.white;

      return {
        backgroundColor,
        color,
      };
    }

    if (theme.palette.mode === "light") {
      backgroundColor = colorsPalette.lightGrey;
      color = colorsPalette.black;
    }

    if (theme.palette.mode === "dark") {
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
      {yearsArray.map((year) => (
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

      <YearStatistics postsByMonth={postsByMonth} />
    </>
  );
};

export default StatisticPage;
