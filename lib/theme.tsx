"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const Ctx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(Ctx);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const resolved = saved === "light" ? "light" : "dark";
    apply(resolved);
    setThemeState(resolved);
  }, []);

  function setTheme(t: Theme) {
    apply(t);
    setThemeState(t);
    localStorage.setItem("theme", t);
  }

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

function apply(t: Theme) {
  const cl = document.documentElement.classList;
  cl.toggle("dark", t === "dark");
  cl.toggle("light", t === "light");
}
