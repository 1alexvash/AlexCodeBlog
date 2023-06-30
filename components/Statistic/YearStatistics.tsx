import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

import { PostsByMonthType } from ".";
import { calculateMarginBottom } from "./pageHelpers";
import styles from "./pageStyles";

const minColumnHeight = 1;
const pixelsHeightPetMonth = 30;

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

interface Props {
  postsByMonth: PostsByMonthType;
}

const YearStatistics = ({ postsByMonth }: Props) => {
  const theme = useTheme();

  const {
    monthlyDiagramWrapper,
    monthlyDiagramColumn,
    monthName,
    monthNameColumn,
    yearStatistics,
  } = styles(theme);

  return (
    <Box sx={yearStatistics}>
      <Box sx={monthlyDiagramWrapper}>
        {months.map((column) => (
          <Box sx={monthlyDiagramColumn} key={column.month}>
            <Typography sx={calculateMarginBottom(postsByMonth[column.month])}>
              {postsByMonth[column.month] ?? 0}
            </Typography>
            <Paper
              sx={{
                height: `${
                  postsByMonth[column.month] > 0
                    ? postsByMonth[column.month] * pixelsHeightPetMonth
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
          <Box sx={{ width: "100%" }} key={month.month}>
            <Box sx={monthNameColumn}> {month.month}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default YearStatistics;
