import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

import { PostsByMonthType } from ".";
import { marginBottomCounter } from "./pageHelpers";
import styles from "./pageStyles";

const minColumnHeight = 1;
const heightByCount = 30;

const monthlySeasons = [
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

const MonthlyDiagramStatistic = ({ postsByMonth }: Props) => {
  const theme = useTheme();

  const { monthlyDiagramWrapper, monthlyDiagramColumn, monthTitlesStyle } =
    styles(theme);

  return (
    <Box>
      <Box sx={monthlyDiagramWrapper}>
        {monthlySeasons.map((column) => (
          <Box sx={monthlyDiagramColumn} key={column.month}>
            <Typography sx={marginBottomCounter(postsByMonth[column.month])}>
              {postsByMonth[column.month] ?? 0}
            </Typography>
            <Paper
              sx={{
                height: `${
                  postsByMonth[column.month] > 0
                    ? postsByMonth[column.month] * heightByCount
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
      <Box sx={monthTitlesStyle}>
        {monthlySeasons.map((currentMonth) => (
          <Box key={currentMonth.month}>{currentMonth.month}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default MonthlyDiagramStatistic;
