interface CustomColorsPalette {
  main: {
    orange: "#FE6C0A";
    white: "#FFFFFF";
    black: "#000000";
    grey: "#33393F";
    darkGrey: "#3A3A3A";
    lightGrey: "#F2F5F7";
    midnight: "#18191D";
    blue: "#3C93BF";
  };
}

declare module "@mui/material/styles/createPalette" {
  interface Palette extends CustomColorsPalette {}
  interface PaletteOptions extends CustomColorsPalette {}
}

export const mainColors = {
  orange: "#FE6C0A",
  white: "#FFFFFF",
  black: "#000000",
  grey: "#33393F",
  darkGrey: "#3A3A3A",
  lightGrey: "#F2F5F7",
  midnight: "#18191D",
  blue: "#3C93BF",
} as CustomColorsPalette["main"];
