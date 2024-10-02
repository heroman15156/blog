'use client';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const { theme, resolvedTheme } = useTheme();

  const giscusTheme = theme === 'dark' || resolvedTheme === 'dark' ? 'dark_high_contrast' : 'light';

  console.log(theme);

  return (
    <div className="my-5 px-4">
      <Giscus
        repo="heroman15156/blog"
        repoId="R_kgDOM3dTiA"
        category="Announcements"
        categoryId="DIC_kwDOM3dTiM4Cizoo"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="ko"
      />
    </div>
  );
}
