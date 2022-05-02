import * as React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --color-background: hsl(0, 0%, 100%);
    --color-text: hsl(222, 22%, 5%); //Jet
    --color-text-white: hsl(0, 0%, 100%); //
    --color-main: hsl(212, 93%, 49%); //Blue Gray
    --color-secondary: hsl(212, 46%, 85%);
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  html, body {
    height: 100%;
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

export const wrapRootElement = ({ element }) => {
	return (
		<>
			<GlobalStyle />
			{element}
		</>
	);
};
