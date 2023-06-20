import { Box, Typography, useTheme } from "@mui/material";
import { PostDocumentWithoutBody } from "interfaces";
import { useState } from "react";

import MonthlyDiagramStatistic from "./MonthlyDiagramStatistic";
import { getPostsByYearAndMonth } from "./pageHelpers";
import styles from "./pageStyles";

export type PostsByMonthType = { [month: string]: number };

interface Props {
  posts: PostDocumentWithoutBody[];
}

const currentYear = new Date().getUTCFullYear();
const previousYear = currentYear - 1;

const StatisticPage = ({ posts }: Props) => {
  const theme = useTheme();

  const [postsByMonth, setPostsByMonth] = useState<PostsByMonthType>(
    getPostsByYearAndMonth(currentYear, posts)
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { pageTitle, pageControlsAlign, yearButton } = styles(theme);

  const handleYearClick = (year: number) => {
    setPostsByMonth(getPostsByYearAndMonth(year, posts));
    setSelectedYear(year);
  };

  const isCurrentYearActive = selectedYear === currentYear;

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
          "& div": yearButton,
        },
      ]}
    >
      <Box
        sx={yearActiveStyles(!isCurrentYearActive)}
        onClick={() => handleYearClick(previousYear)}
      >
        {previousYear}
      </Box>
      <Box
        sx={yearActiveStyles(isCurrentYearActive)}
        onClick={() => handleYearClick(currentYear)}
      >
        {currentYear}
      </Box>
    </Box>
  );

  return (
    <Box>
      <Typography sx={pageTitle}>Statistics</Typography>
      {pageControls}

      <MonthlyDiagramStatistic postsByMonth={postsByMonth} />
    </Box>
  );
};

export default StatisticPage;
