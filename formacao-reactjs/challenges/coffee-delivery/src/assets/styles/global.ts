import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    max-width: 1440px;
    margin: auto;
  }

  span, p, h1, button {
    /* font-family: 'Roboto', sans-serif;
    line-height: 130%; */
  }

  button {
    /* font-weight: 400;
    line-height: 160%; */
    cursor: pointer;
  }
`