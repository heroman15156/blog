'use client';
import { ABOUT_PATHNAME, POSTS_PATHNAME, PROJECTS_PATHNAME } from '@/constant/pathname';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '@/components/layout/Header.module.css';
const navLinks = [
  { href: POSTS_PATHNAME, label: 'Post' },
  { href: ABOUT_PATHNAME, label: 'About' },
  { href: PROJECTS_PATHNAME, label: 'Project' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className={`${styles.linkLists} flex items-center space-x-6 relative`}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li className={`${styles.listItem} relative`} key={link.href}>
            <Link
              href={link.href}
              className={`text-[16px]  hover:text-activeColor dark:hover:text-activeColor pb-[19px] ${
                isActive
                  ? 'text-red border-b-2 max-1038:border-b-0 border-activeColor dark:text-activeColor'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
