import * as React from "react";
import { GlobalStyle } from "./src/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./src/themes";

export const UserContext = React.createContext();

const App = ({element}) => {
  const [isDark, setIsDark] = React.useState(false);

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
