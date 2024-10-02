import BlogPostsSection from '@/components/BlogPostsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그 포스트 | 김현진의 웹 개발 블로그',
  description:
    '웹 개발, 프론트엔드 기술, 그리고 소프트웨어 엔지니어링에 대한 최신 블로그 포스트를 확인하세요.',
  openGraph: {
    title: '블로그 포스트 | 김현진의 웹 개발 블로그',
    description: '웹 개발과 프론트엔드 기술에 대한 인사이트가 담긴 블로그 포스트 목록입니다.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div>
      <BlogPostsSection />
    </div>
  );
}
