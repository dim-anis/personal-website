import * as React from "react";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { GlobalStyle } from "./src/GlobalStyle"

export const wrapPageElement = ({ element }) => {
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  )
}

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      {element}
    </ThemeProvider>
  ) 
}