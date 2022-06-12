import * as React from "react";
import { COLORS } from "./src/constants";

export { wrapPageElement, wrapRootElement } from "./gatsby-browser";

  const getInitialColorMode = () => {
    const colors = '🌈';

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkMQ = mql.matches;
    const lastPreference = localStorage.getItem('dark');
    
    let isDark = false;

    const hasLastPreference = typeof lastPreference === 'string';

    hasLastPreference 
      ? isDark = JSON.parse(lastPreference) 
      : isDark = prefersDarkMQ 

    const root = document.documentElement

    root.style.setProperty('--is-dark-mode', JSON.stringify(isDark));

    Object.entries(colors).forEach(([property, colorByTheme]) => {
      const cssVarName = `--color-${property}`;
      root.style.setProperty(cssVarName, colorByTheme[isDark ? 'dark' : 'light']);
    });
  }

  const MagicScriptTag = () => {
    const stringFunc = String(getInitialColorMode).replace("'🌈'", JSON.stringify(COLORS));

    let preLoadFunc = `(${stringFunc})()`;

    return <script dangerouslySetInnerHTML={{ __html: preLoadFunc }} />
  }

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
};