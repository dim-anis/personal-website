import { createGlobalStyle } from "styled-components";

import SpaceGrotesk from "../static/fonts/SpaceGrotesk.woff2";
import FiraCode from "../static/fonts/FiraCode-VF.woff2";

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-code: 'Fira Code', monospace;
  }

  @font-face {
    font-family: 'Space Grotesk';
    src: url(${SpaceGrotesk}) format('woff2');
    font-weight: 400 600 700;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Fira Code';
    src: url(${FiraCode}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--color-primaryDimmed);
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 100px;
  }
  html {
    scrollbar-color: var(--color-primaryDimmed);
    scrollbar-width: thin;
    scroll-behavior: smooth;
  }

  html, body {
    height: 100%;
    overflow-x: hidden;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    margin: 0 auto;
    font-family: 'Space Grotesk', sans-serif;
    color: var(--color-text);
    background: var(--color-background);
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  input, button, textarea, select {
    font: inherit;
  }
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  #root, #__next {
    isolation: isolate;
  }
`;