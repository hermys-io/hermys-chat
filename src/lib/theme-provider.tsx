import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";

interface ThemeProviderProps {
  children?: React.ReactNode;
}

type ThemeFlavours = "light" | "dark";

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  return children;
}

export const themeState = atom<ThemeFlavours>("light");

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useAtom(themeState);

  const getTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) return currentTheme as ThemeFlavours;
    return "light" as ThemeFlavours;
  };

  const setTheme = (theme: ThemeFlavours) => {
    localStorage.setItem("theme", theme);

    if (theme == "light") {
      document.body.classList.remove("dark");
      document.body.classList.add(theme);
    } else {
      document.body.classList.remove("light");
      document.body.classList.add(theme);
    }
  };

  const toggleTheme = () => {
    const currentTheme = getTheme();
    if (currentTheme == "light") {
      setTheme("dark");
      setCurrentTheme("dark");
    } else {
      setTheme("light");
      setCurrentTheme("light");
    }
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
      setCurrentTheme(selectedTheme as ThemeFlavours);
      document.body.classList.add(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setCurrentTheme("dark");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      setCurrentTheme("light");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [setCurrentTheme]);

  return { getTheme, setTheme, toggleTheme, currentTheme };
};
