'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  function toggleDarkMode() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300">
        <div className="h-6 w-6" />
      </button>
    );
  }
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
      // aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-6 w-6 text-yellow-400 transition-transform duration-300 transform rotate-45" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-200 transition-transform duration-300 transform rotate-45" />
      )}
    </button>
  );
}
