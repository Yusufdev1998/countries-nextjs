"use client";

import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const onModeChange = (e: any) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onModeChange);

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onModeChange);
  }, []);

  const handleDark = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };
  return (
    <header className="bg-white dark:bg-header-dark dark:text-white py-6 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)]">
      <div className="px-4 container mx-auto flex justify-between items-center">
        <span className="md:text-2xl text-sm font-extrabold">🌎 WTW</span>

        <div className="flex gap-2 cursor-pointer" onClick={handleDark}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              className="stroke-primary dark:stroke-white"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z"
              fill="white"
              strokeWidth="1.25"
            />
          </svg>
          <span className="font-semibold">Dark Mode</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
