import { Box } from "@mui/material";
import React from "react";

import MortalityReminder from "./MortalityReminder";
import TimeToNewYear from "./TimeToNewYear";

const Timers = () => (
  <Box sx={{ display: "flex", gap: "20px" }}>
    <MortalityReminder />
    <TimeToNewYear />
  </Box>
);

export default Timers;
