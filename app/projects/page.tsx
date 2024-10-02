import Projects from '@/components/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 프로젝트 | 김현진의 포트폴리오',
  description:
    '프리랜서 및 개인 프로젝트 포트폴리오. 다양한 클라이언트와의 협업을 통해 얻은 실무 경험과 기술력을 소개합니다.',
  openGraph: {
    title: '김현진의 프로젝트 포트폴리오',
    description: '웹 개발 프로젝트 모음. 프리랜서 및 개인 프로젝트를 포함합니다.',
    type: 'website',
    // url: 'https://your-website.com/projects',
  },
};

export default function ProjectsPage() {
  return <Projects />;
}
