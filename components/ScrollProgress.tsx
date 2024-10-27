'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollPosition / docHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window) {
      const videoEle = document.querySelector('video');
      if (videoEle) {
        console.log('123123');
      }
    }
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 transition-all duration-200 z-50"
      style={{
        width: `${scrollProgress}%`,
        backgroundColor: scrollProgress ? '#4f46e5' : '#e5e7eb',
      }}
    />
  );
}
