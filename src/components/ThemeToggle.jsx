// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark" || prefersDark
  );

  /* sync DOM & storage */
  useEffect(() => {
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition"
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
