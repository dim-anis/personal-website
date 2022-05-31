import * as React from "react";

import { GlobalStyle } from "./src/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./src/themes";

import { UserContext } from "./src/contexts/UserContext";
import { useDarkMode } from "./src/hooks/useDarkMode";
 
const App = ({element}) => {

  //checking if the user agent has a theme preference
  const prefersDark = window.matchMedia('prefers-color-scheme: dark').matches;
  const [isDark, setIsDark] = useDarkMode("dark", prefersDark);

  const toggleTheme = () => {
    isDark ? setIsDark(false) : setIsDark(true);
  }

  return (
    <UserContext.Provider value={{
      isDark,
      toggleTheme
    }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {element}
      </ThemeProvider>
		</UserContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => {

  return (
    <App element={element} />
	);
};
