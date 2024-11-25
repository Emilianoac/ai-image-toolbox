"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun} from "react-icons/fa";

export default function AppThemeToggle() {
  const { setTheme, theme} = useTheme();
  const [themeReady, setThemeReady] = useState(false);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    setThemeReady(true);
  }, [theme])


  return (
    <button 
      onClick={() => toggleTheme()}
      title="Cambiar tema"
      className="
      rounded-full flex items-center justify-center
      transition-colors duration-200 ease-in-out
      bg-slate-200 
      dark:bg-app-dark-100
      hover:bg-slate-300 dark:hover:bg-app-dark-200
      h-[30px] w-[30px]">
      {themeReady && theme === "dark" ? <FaSun/> : <FaMoon />}
    </button>
  )
}
