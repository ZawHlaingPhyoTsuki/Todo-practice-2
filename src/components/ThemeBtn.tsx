'use client';

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

type Theme = "light" | "dark";

export default function ThemeBtn() {

    // const [theme, setTheme] = useState<Theme>("light");

    // const toggleTheme = () => {
    //   if (theme === "light") {
    //     setTheme("dark");
    //     window.localStorage.setItem("theme", "dark");
    //     document.documentElement.classList.add("dark");
    //   } else {
    //     setTheme("light");
    //     window.localStorage.setItem("theme", "light");
    //     document.documentElement.classList.remove("dark");
    //   }
    // };

    // useEffect(() => {
    //   const localTheme = window.localStorage.getItem("theme") as Theme | null;

    //   if (localTheme) {
    //     setTheme(localTheme);

    //     if (localTheme === "dark") {
    //       document.documentElement.classList.add("dark");
    //     }
    //   } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //     setTheme("dark");
    //     document.documentElement.classList.add("dark");
    //   }
    // }, []);

  return (
    <Button className='fixed bottom-4 right-4' onClick={() => document.documentElement.classList.toggle('dark')}>
        Toggle Theme
    </Button>
  )
}
