// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    blizzard: {
      50: "#FBFDFE",
      100: "#EAF5FA",
      200: "#C9E4F3",
      300: "#A8D3EB",
      400: "#7ABCE1",
      500: "#4DA5D6",
      600: "#2C8ABF",
      700: "#216991",
      800: "#174864",
      900: "#0C2736",
    },
    wetfloor: {
      50: "#FFFC1F",
      100: "#FDF800",
      200: "#F3EC00",
      300: "#E9DF00",
      400: "#DED300",
      500: "#D4C800",
      600: "#CABC00",
      700: "#C0B100",
      800: "#B6A500",
      900: "#AB9A00",
    },
  },
});

export default theme;
