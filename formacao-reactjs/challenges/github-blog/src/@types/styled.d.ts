/**
 * .d.ts in TypeScript is a declaration file
 * It's used to describe the types of JavaScript code without implementation any logic
 */
import "styled-components";

import { defaultTheme } from "../assets/styles/themes/default";

type ThemeType = typeof defaultTheme;

/**
 * "declare module" is used to overwrite some interface or method in some library
 */
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
