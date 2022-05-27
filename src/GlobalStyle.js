import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-background: hsl(0, 0%, 95%);
    --color-background-transparent: hsl(0 0% 95% / 0.85);
    --color-background-secondary: hsl(0, 0%, 100%);
    --color-background-dark: hsl(222, 22%, 10%);
    --color-background-dark-transparent: hsl(222 22% 10% / 0.85);
    --color-background-dark-secondary: hsl(222, 22%, 15%);
    --color-text: hsl(222, 22%, 13%); //Jet (hsl 222, 22%, 5%)
    --color-text-medium: hsl(222, 22%, 40%);
    --color-text-low: hsl(222, 22%, 62%);
    --color-text-white: hsl(0, 0%, 87%); //
    --color-text-white-medium: hsl(0, 0%, 60%);
    --color-text-white-low: hsl(0, 0%, 38%);
    --color-text-gray: hsl(222, 22%, 60%);
    --color-main: hsl(212, 93%, 49%); //Blue Gray
    --color-main-light: hsl(212, 93%, 95%);
    --color-main-light-dark: hsl(212, 35%, 20%);
    --color-main-dark: hsl(212, 85%, 70%);
    --color-secondary: hsl(212, 46%, 85%);

    --font-code: 'Fira Code', monospace;
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
    background-color: var(--color-background-gray);
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 100px;
  }
  html {
    scrollbar-color: var(--color-background-gray);
    scrollbar-width: thin;
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
    color: ${props => props.theme.fontColor};
    background: ${props => props.theme.body};
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