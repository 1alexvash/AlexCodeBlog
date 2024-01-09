import { Box } from "@mui/material";
import React from "react";

import {
  calculateDaysToTheDate,
  calculateMonthsAndDaysToTheDate,
} from "./helpers";

const newYearDate = new Date(new Date().getFullYear() + 1, 0, 1);

const moreThanOneMonthToDate = (startDate: Date, endDate: Date) => {
  return (
    startDate.getMonth() > endDate.getMonth() ||
    (startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() > endDate.getDate())
  );
};

const TimeToNewYear = () => (
  <Box
    sx={(theme) => ({
      maxWidth: "270px",
      background:
        theme.palette.mode === "dark"
          ? theme.palette.main.grey
          : theme.palette.main.lightGrey,
      color:
        theme.palette.mode === "dark" ? "white" : theme.palette.main.darkGrey,
      padding: "10px",
      borderRadius: "4px",
      border: `1px solid ${theme.palette.main.grey}`,
      textAlign: "center",
    })}
  >
    <Box sx={{ fontWeight: "bold" }}>Time To New Year</Box>
    <Box sx={{ fontSize: "100px", py: "10px" }}>❄</Box>

    <Box>
      It is {calculateMonthsAndDaysToTheDate(newYearDate)} to the next year ☃
    </Box>

    {moreThanOneMonthToDate(new Date(), newYearDate) && (
      <Box sx={{ my: "10px" }}>
        Or just {calculateDaysToTheDate(newYearDate)} days.
      </Box>
    )}
  </Box>
);

export default TimeToNewYear;
