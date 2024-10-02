import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'max-1038': { max: '1038px' }, // 1038px 이하일 때 적용
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        activeColor: 'var(--active-color)', // CSS 변수를 색상으로 등록
        darkBackground: '#0a0a0a',
        dark: '#0a0a0a',
        whiteBg: '#fcfcfc',
        darkBgSecondary: '#262626',
      },
      fontFamily: {
        scdream: ['var(--font-sc-dream)', 'sans-serif'], // SCDream 폰트
        geistSans: ['var(--font-geist-sans)', 'sans-serif'], // Geist Sans 폰트
      },
    },
  },
  plugins: [],
};
export default config;
