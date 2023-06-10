import { Box, Typography, useTheme } from "@mui/material";
import { PostDocumentWithoutBody } from "interfaces";
import { useState } from "react";

import MonthlyDiagram from "./MonthlyDiagram";
import { getPostsByYearAndMonth } from "./pageHelpers";
import styles from "./pageStyles";

export type PostsByMonthType = { [month: string]: number };

interface Props {
  posts: PostDocumentWithoutBody[];
}

const StatisticPage = ({ posts }: Props) => {
  const theme = useTheme();

  const [postsByMonth, setPostsByMonth] = useState<PostsByMonthType>(
    getPostsByYearAndMonth(new Date().getFullYear(), posts)
  );
  const [selectedYear, setSelectedYear] = useState(2023);

  const { pageTitle, pageControlsAlign, yearButtonWidth } = styles(theme);

  const handleYearClick = (year: number) => {
    setPostsByMonth(getPostsByYearAndMonth(year, posts));
    setSelectedYear(year);
  };

  const isTodayYearActive = selectedYear === 2023;

  const yearActiveStyles = (condition: boolean) => {
    let backgroundColor, color;

    if (condition) {
      backgroundColor = theme.palette.main.orange;
      color = theme.palette.main.white;

      return {
        backgroundColor,
        color,
      };
    }

    if (theme.palette.mode === "light") {
      backgroundColor = theme.palette.main.lightGrey;
      color = theme.palette.main.black;
    }

    if (theme.palette.mode === "dark") {
      backgroundColor = theme.palette.main.grey;
      color = theme.palette.main.white;
    }

    return {
      backgroundColor,
      color,
    };
  };

  const pageControls = (
    <Box>
      <Box
        sx={[
          pageControlsAlign,
          {
            "& div": yearButtonWidth,
          },
        ]}
      >
        <Box
          sx={yearActiveStyles(!isTodayYearActive)}
          onClick={() => handleYearClick(2022)}
        >
          2022
        </Box>
        <Box
          sx={yearActiveStyles(isTodayYearActive)}
          onClick={() => handleYearClick(2023)}
        >
          2023
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Typography sx={pageTitle}>Statistics</Typography>
      {pageControls}

      <MonthlyDiagram postsByMonth={postsByMonth} />
    </Box>
  );
};

export default StatisticPage;
