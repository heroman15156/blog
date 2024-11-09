import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { GoogleTagManager } from '@next/third-parties/google';

import Header from '@/components/layout/Header';
import React from 'react';
import Footer from '@/components/layout/Footer';
import { isProduction } from '../constant/env';
import { Providers } from '@/app/providers';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const scdream = localFont({
  src: [
    {
      path: '../fonts/SCDream4.otf',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../fonts/SCDream5.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../fonts/SCDream6.otf',
      weight: '700',
      style: 'bold',
    },
  ],
});

export const metadata: Metadata = {
  title: '김현진 | 웹 개발 기술 블로그',
  description:
    '웹 개발, 프론트엔드 기술, 그리고 소프트웨어 엔지니어링에 대한 인사이트를 공유하는 김현진의 기술 블로그입니다.',
  keywords: '웹 개발, 프론트엔드, JavaScript, React, Typescript, Next.Js,기술 블로그, 김현진',
  authors: [{ name: '김현진' }],
  openGraph: {
    title: '김현진의 웹 개발 기술 블로그',
    description: '최신 웹 개발 트렌드와 기술적 인사이트를 공유합니다.',
    type: 'website',
  },
  twitter: {
    title: '김현진의 웹 개발 기술 블로그',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${scdream.className} ${geistSans.variable} flex flex-col min-h-screen`}>
        {isProduction && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />}
        <Providers>
          <Header />
          <main className="max-w-screen-xl mx-auto w-full px-[20px] pt-[100px] flex-1">
            {children}
            {modal}
          </main>
          <Footer />

          <div id="modal-root"></div>
        </Providers>
      </body>
    </html>
  );
}
