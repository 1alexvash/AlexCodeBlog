import { Theme } from "@mui/material";

const styles = (theme: Theme) => ({
  pageTitle: {
    fontSize: "50px",
    fontWeight: "700",
    lineHeight: "64px",
    color:
      theme.palette.mode === "light"
        ? theme.palette.main.darkGrey
        : theme.palette.main.white,
    mb: "36px",
  },
  pageControlsAlign: {
    display: "flex",
    gap: "5px",
    mb: "36px",
    "& div": {
      display: "flex",
      height: "27px",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  },
  yearButtonStyle: {
    width: "57px",
  },
  monthButtonStyle: {
    width: "80px",
  },
  monthlyDiagramWrapper: {
    display: "flex",
    alignItems: "end",
    gap: "10px",
    width: "100%",
    height: "385px",
    px: "10px",
  },
  monthlyDiagramColumn: {
    width: "100%",
    maxWidth: "90px",
    textAlign: "center",
    "& .MuiTypography-root": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.main.black
          : theme.palette.main.white,
    },
    "& .MuiPaper-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "end",
      width: "89px",
      background: theme.palette.main.orange,
      "& img": {
        mb: "3px",
      },
    },
  },
  monthName: {
    display: "flex",
    width: "100%",
    px: "10px",
    gap: "10px",
    pt: "10px",
  },
  monthNameColumn: {
    width: "89px",
    color:
      theme.palette.mode === "light"
        ? theme.palette.main.black
        : theme.palette.main.white,
    fontSize: "14px",
    textAlign: "center",
  },
  yearStatistics: {
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.main.lightGrey
        : theme.palette.main.grey,
  },
});

export default styles;
