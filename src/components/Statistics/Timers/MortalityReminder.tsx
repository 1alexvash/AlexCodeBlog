import { Box, Divider } from "@mui/material";
import React from "react";

import {
  calculateAge,
  calculateDaysToTheDate,
  calculateMonthsAndDaysToTheDate,
} from "./helpers";

const AlexBirthDate = new Date("1998-07-22");

const averageMonthLength = 30;

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
    <Box>
      It is {calculateMonthsAndDaysToTheDate(AlexBirthDate)} to your next 🍰
      birthday.
    </Box>
    {calculateDaysToTheDate(AlexBirthDate) > averageMonthLength && (
      <Box sx={{ my: "10px" }}>
        Or just {calculateDaysToTheDate(AlexBirthDate)} days.
      </Box>
    )}
    <Box sx={{ mt: "10px" }}>Remember to use this time wisely.</Box>
  </Box>
);

export default MortalityReminder;
