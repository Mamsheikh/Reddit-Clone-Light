import { Button } from "./button";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },

    colors: {
      brand: {
        100: "#FF3C00",
      },
    },
    fonts: {
      body: `'Open Sans', sans-serif`,
    },
    styles: {
      global: () => ({
        body: {
          bg: "gray.200",
        },
      }),
    },
    components: {
      Button,
    },
});

export default extendTheme(theme);
