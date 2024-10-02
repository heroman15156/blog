'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect, // useEffect 대신 useLayoutEffect 사용
  useState,
} from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '@/styles/theme';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('dark');

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const selectedTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={selectedTheme}>
        <div className={theme}>{children}</div>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
