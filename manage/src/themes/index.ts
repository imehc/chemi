import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import Button from "./button";

/**
 * 自定义主题
 * @link https://chakra-ui.com/docs/styled-system/customize-theme
 */
export const theme = extendTheme(
  {
    components: {
      Button,
    },
  },
  withDefaultColorScheme({ colorScheme: "brand", components: ["Button"] })
);
