import { useEffect } from "react";

interface ThemeProviderProps {
  children?: React.ReactNode;
}

type ThemeFlavours = "light" | "dark";

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, []);

  return children;
}

export const useTheme = () => {
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

  return { getTheme, setTheme };
};
