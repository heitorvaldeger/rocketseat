import { css } from "styled-components";

export const defaultTheme = {
  colors: {
    "blue": "#3294F8",
    "base-input": "#040F1A",
    "base-background": "#071422",
    "base-profile": "#0B1B2B",
    "base-post": "#112131",
    "base-border": "#1C2F41",
    "base-label": "#3A536B",
    "base-span": "#7B96B2",
    "base-text": "#AFC2D4",
    "base-subtitle": "#C4D4E3",
    "base-title": "#E7EDF4"
  },
  fonts: {
    titleL: css`
      line-height: 160%;
      font-size: 24px;
    `,
    titleM: css`
      line-height: 160%;
      font-size: 20px;
    `,
    titleS: css`
      line-height: 160%;
      font-size: 18px;
    `,
    textM: css`
      line-height: 160%;
      font-size: 16px;
    `,
    textS: css`
      line-height: 160%;
      font-size: 14px;
    `,
    link: css`
      line-height: 160%;
      font-size: 12px;
    `
  }
} as const