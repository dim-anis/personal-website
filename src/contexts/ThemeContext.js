import * as React from "react";
import { useDarkMode } from "../hooks/useDarkMode";

import { COLORS } from "../constants";

const defaultState = {
  isDark: undefined,
  toggleTheme: () => {}
};

export const ThemeContext = React.createContext(defaultState);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useDarkMode('dark', undefined);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const isDarkMode = root.style.getPropertyValue('--is-dark-mode');
    setIsDark(JSON.parse(isDarkMode));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    setIsDark(!isDark);
    localStorage.setItem('dark', JSON.stringify(isDark));

    Object.entries(COLORS).forEach(([name, colorByTheme]) => {
      const cssVarName = `--color-${name}`;

      root.style.setProperty(cssVarName, colorByTheme[!isDark ? 'dark' : 'light']);
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}