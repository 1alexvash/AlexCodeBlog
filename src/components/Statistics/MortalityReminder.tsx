import { Box, Divider } from "@mui/material";
import React from "react";

function calculateAge(birthDate: Date) {
  const birthTime = birthDate.getTime();
  const now = Date.now();
  const ageInMillis = now - birthTime;

  const ageInSeconds = ageInMillis / 1000;
  const ageInYears = ageInSeconds / (60 * 60 * 24 * 365.25);

  const ageDecimalPart = ageInYears - Math.floor(ageInYears);

  const numberAfterDecimalPoint = 2;

  const ageFormatted = `${Math.floor(ageInYears)}.${(
    Number(ageDecimalPart.toFixed(numberAfterDecimalPoint)) *
    10 ** numberAfterDecimalPoint
  )
    .toFixed(0)
    .padStart(numberAfterDecimalPoint, "0")}`;

  return ageFormatted;
}

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

const AlexBirthDate = new Date("1998-07-22");

const MortalityReminder = () => (
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
    <Box sx={{ fontWeight: "bold" }}>Mortality reminder</Box>
    <Box sx={{ fontSize: "100px" }}>☠</Box>
    <Box>
      Today I am{" "}
      <Box component="span" sx={{ fontWeight: "bold", fontSize: "32px" }}>
        {calculateAge(AlexBirthDate)}
      </Box>{" "}
      years old
    </Box>
    <Divider sx={{ my: "10px" }} />
    {calculateTimeToNextBirthday(AlexBirthDate)}
    <Box sx={{ my: "10px" }}>
      Or just {calculateDaysToNextBirthday(AlexBirthDate)} days.
    </Box>
    <Box>Remember to use this time wisely.</Box>
  </Box>
);

export default MortalityReminder;
