'use client';

import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';
import NavLinks from '@/components/NavLists';
import styles from './Header.module.css';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 상태 관리
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태 관리

  function toggleMenu() {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setTimeout(() => setIsAnimating(true), 100); // 약간의 딜레이를 주어 애니메이션 자연스럽게 시작
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsMenuOpen(false), 100); // 닫힐 때 애니메이션이 끝난 후 메뉴 닫기
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-darkBackground">
      <div className="mx-auto w-full max-w-screen-xl flex justify-between items-center pt-5 pb-2 pl-5 pr-5 transition-colors duration-300 box-border">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-semibold hidden sm:inline-block">
            <span className="text-gray-700 dark:text-gray-300">Heroman</span>
            <span className="text-blue-600 dark:text-blue-400">.DEV</span>
          </span>
        </Link>

        <nav className={`flex space-x-6 items-center ${styles.navLists}`}>
          <NavLinks />
          <DarkModeToggle />
        </nav>

        {isMenuOpen ? (
          <button
            className="fixed top-5 right-5 text-gray-900 dark:text-white z-[60] text-xl"
            onClick={toggleMenu}
          >
            ✕
          </button>
        ) : (
          <button className={`${styles.hamburger} md:hidden`} onClick={toggleMenu}>
            <div className={`${styles.hamburgerLine} dark:bg-white`}></div>
            <div className={`${styles.hamburgerLine} dark:bg-white`}></div>
            <div className={`${styles.hamburgerLine} dark:bg-white`}></div>
          </button>
        )}
      </div>

      <div
        className={`${styles.menu} ${isAnimating ? styles.menuOpen : styles.menuClose} ${
          isMenuOpen ? styles.visible : ''
        } bg-white dark:bg-darkBackground`}
      >
        <nav className="flex flex-col space-y-4 p-4 max-1038:p-[2.5rem]">
          <NavLinks toggleMenu={toggleMenu} isMobile={true} />
          <div className="w-auto self-start">
            <DarkModeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
