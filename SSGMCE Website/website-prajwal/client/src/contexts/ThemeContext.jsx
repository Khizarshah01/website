import React, { createContext, useContext, useState, useLayoutEffect, useCallback } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

const applyTheme = (t) => {
  const root = document.documentElement;
  if (t === "dark" || (t === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem("admin-theme");
    if (stored === "light" || stored === "dark" || stored === "auto") return stored;
    return "light";
  });

  const setTheme = useCallback((t) => {
    setThemeState(t);
    localStorage.setItem("admin-theme", t);
    applyTheme(t);
  }, []);

  // useLayoutEffect runs synchronously before paint — prevents flash
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for OS preference changes when in "auto" mode
  useLayoutEffect(() => {
    if (theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("auto");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
