import { Box } from "@mui/material";
import Link from "next/link";

const StatisticsLink = () => (
  <Box
    sx={(theme) => ({
      width: 200,
      "& a": {
        cursor: "pointer",
        mb: "20px",
        display: "block",
        padding: "12px 19px",
        textAlign: "center",
        background:
          theme.palette.mode === "light"
            ? theme.palette.main.lightGrey
            : theme.palette.main.grey,
        borderRadius: "4px",
        border: "1px solid transparent",
        color:
          theme.palette.mode === "light"
            ? theme.palette.main.darkGrey
            : theme.palette.main.lightGrey,
        transition: "all 0.3s ease-out",
        "&:hover": {
          borderColor:
            theme.palette.mode === "light"
              ? theme.palette.main.darkGrey
              : theme.palette.main.lightGrey,
        },
      },
    })}
  >
    <Link href="/statistics">Statistics page</Link>
  </Box>
);

export default StatisticsLink;
