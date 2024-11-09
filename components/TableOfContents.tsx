'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useScroll, useSpring, motion } from 'framer-motion';
import { slug } from 'github-slugger'; // 새로 추가

type Props = {
  content: string;
};

type TocItem = {
  id: string;
  title: string;
  level: number;
};
export default function TableOfContents({ content }: Props) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const headings = content.match(/^#{1,6}\s.+$/gm) || [];
    const tocItems = headings.map((heading) => {
      const level = heading.match(/^#+/)?.[0].length || 0;
      const title = heading.replace(/^#+\s/, '');
      const id = slug(title);
      return { id, title, level };
    });
    setToc(tocItems);
    console.log('Generated TOC items:', tocItems); // 디버깅용 로그
  }, [content]);

  const getActiveId = useCallback(() => {
    const scrollPosition = window.scrollY;
    const headerOffset = 100;

    for (let i = toc.length - 1; i >= 0; i--) {
      const section = document.getElementById(toc[i].id);
      if (section) {
        const sectionTop = section.offsetTop - headerOffset;
        if (scrollPosition >= sectionTop) {
          return toc[i].id;
        }
      }
    }
    return '';
  }, [toc]);

  useEffect(() => {
    const handleScroll = () => {
      const newActiveId = getActiveId();
      if (newActiveId !== activeId) {
        setActiveId(newActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [getActiveId, activeId]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-24 self-start w-full overflow-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50" style={{ scaleX }} />
      <h2 className="text-lg font-semibold mb-4">목차</h2>
      <ul className="space-y-2">
        {toc.map((item) => (
          <motion.li
            key={item.id}
            style={{ marginLeft: `${(item.level - 1) * 0.5}rem` }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={`text-sm block transition-colors duration-200 ease-in-out ${
                activeId === item.id
                  ? 'text-blue-600 font-semibold dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              {item.title}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
