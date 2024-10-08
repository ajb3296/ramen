import { extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

const fonts = {
  heading: "DOSMyungjo, sans-serif",
  body: "DOSMyungjo, sans-serif",
};

const theme = extendTheme({ fonts });

const GlobalStyles = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'DOSMyungjo';
        src: url('/fonts/DOSMyungjo.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `}
  />
);

export { theme, GlobalStyles };