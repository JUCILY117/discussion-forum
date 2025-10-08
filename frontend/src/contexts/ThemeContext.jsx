import React, { createContext, useState, useEffect, useContext } from "react";
import { lightTheme, darkTheme } from "../styles/theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setTheme(darkTheme);
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setTheme(lightTheme);
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      setTheme(darkTheme);
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
