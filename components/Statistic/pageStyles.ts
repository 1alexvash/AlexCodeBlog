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
  yearButtonWidth: {
    width: "57px",
  },
  monthButtonWidth: {
    width: "80px",
  },
  monthlyDiagramWrapper: {
    display: "flex",
    alignItems: "end",
    gap: "10px",
    width: "1210px",
    height: "385px",
    px: "10px",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.main.lightGrey
        : theme.palette.main.grey,
  },
  monthlyDiagramColumn: {
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
      width: "90px",
      background: theme.palette.main.orange,
      "& img": {
        mb: "3px",
      },
    },
  },
  monthNameStyle: {
    display: "flex",
    justifyContent: "space-between",
    px: "10px",
    gap: "10px",
    width: "1210px",
    mt: "10px",
    "& .MuiBox-root": {
      width: "90px",
      textAlign: "center",
    },
  },
});

export default styles;
