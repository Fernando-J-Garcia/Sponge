import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: (props: StyleFunctionProps) => ({
      colors: {
        gray: {
          100: props.colorMode === "dark" ? "#2D3748" : "#EDF2F7",
        },
      },
    }),
  },
});

export default theme;
