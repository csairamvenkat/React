import React, {
  createContext,
  useState
} from "react";

import {
  ThemeProvider,
  createTheme
} from "@mui/material/styles";

export const ThemeContext =
  createContext();

function ThemeContextProvider({
  children
}) {
const [darkMode, setDarkMode] =
  useState(
    localStorage.getItem(
      "darkMode"
    ) === "true"
  );

const toggleTheme = () => {
  const newMode =
    !darkMode;

  setDarkMode(newMode);

  localStorage.setItem(
    "darkMode",
    newMode
  );
};
  const theme = createTheme({
    palette: {
      mode: darkMode
        ? "dark"
        : "light"
    }
  });

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;