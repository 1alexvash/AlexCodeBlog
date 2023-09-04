import { Box } from "@mui/material";
import React from "react";

function calculateTimeToNextBirthday(birthDate: Date) {
  const today = new Date();
  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const timeDifference = Number(nextBirthday) - Number(today);
  const daysToNextBirthday = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const monthsToNextBirthday = Math.floor(daysToNextBirthday / 30);

  if (monthsToNextBirthday > 0) {
    return `It is ${monthsToNextBirthday} months and ${
      daysToNextBirthday % 30
    } days to your next 🍰 birthday.`;
  } else {
    return `It is ${daysToNextBirthday} days to your next birthday.`;
  }
}

const calculateDaysToNextBirthday = (birthDate: Date) => {
  const today = new Date();
  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const timeDifference = Number(nextBirthday) - Number(today);
  const daysToNextBirthday = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysToNextBirthday;
};

const NewYearDate = new Date(new Date().getFullYear() + 1, 0, 1);

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
    <Box sx={{ fontSize: "100px" }}>❄</Box>

    {calculateTimeToNextBirthday(NewYearDate)}
    <Box sx={{ my: "10px" }}>
      Or just {calculateDaysToNextBirthday(NewYearDate)} days.
    </Box>
  </Box>
);

export default TimeToNewYear;
