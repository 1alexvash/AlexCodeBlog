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

  const { pageTitle, pageControlsAlign, yearButtonWidth, monthButtonWidth } =
    styles(theme);

  const handleYearClick = (year: number) => {
    setPostsByMonth(getPostsByYearAndMonth(year, posts));
    setSelectedYear(year);
  };

  const isTodayYearActive = selectedYear === 2023;

  const yearActiveStyles = (condition: boolean) => ({
    backgroundColor: condition
      ? theme.palette.main.orange
      : theme.palette.mode === "light"
      ? theme.palette.main.lightGrey
      : theme.palette.main.grey,
    color: condition
      ? theme.palette.main.white
      : theme.palette.mode === "light"
      ? theme.palette.main.black
      : theme.palette.main.white,
  });

  const pageControls = (
    <Box>
      <Box
        sx={[
          pageControlsAlign,
          {
            "& div": {
              ...yearButtonWidth,
            },
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
      <Box
        sx={[
          pageControlsAlign,
          {
            "& div": {
              ...monthButtonWidth,
              backgroundColor: "#FE6C0A",
              color: "white",
            },
          },
        ]}
      >
        <Box>Monthly</Box>
        <Box>Weekly</Box>
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
