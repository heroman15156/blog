'use client';

import { useTheme } from '@/context/theme-provider';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
