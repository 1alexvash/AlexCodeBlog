import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

import { PostsByMonthType } from ".";
import { counterMarginBottom } from "./pageHelpers";
import styles from "./pageStyles";

const seasonData = [
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

interface Props {
  postsByMonth: PostsByMonthType;
}

const MonthlyDiagram = ({ postsByMonth }: Props) => {
  const theme = useTheme();

  const { monthlyDiagramWrapper, monthlyDiagramColumn } = styles(theme);

  return (
    <Box sx={monthlyDiagramWrapper}>
      {seasonData.map((column) => (
        <Box sx={monthlyDiagramColumn} key={column.month}>
          <Typography
            sx={{
              ...counterMarginBottom(postsByMonth[column.month]),
            }}
          >
            {postsByMonth[column.month] ?? 0}
          </Typography>
          <Paper
            sx={{
              height: `${
                postsByMonth[column.month] > 0
                  ? postsByMonth[column.month] * 30
                  : 1
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
  );
};

export default MonthlyDiagram;
