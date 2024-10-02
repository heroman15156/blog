import AboutMeSection from '@/components/Section/AboutSction';
import WorkExperienceSection from '@/components/Section/WorkExperienceSection';
import EducationalBackgroundSection from '@/components/Section/EducationBackgroundSection';
import AboutPageContainer from '@/components/AboutPageContainer';
import IntroductionSection from '@/components/Section/IntroductionSection';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: '김현진 소개 | 웹 개발자 프로필',
  description:
    '웹 개발자 김현진의 경력, 기술 스택, 그리고 프로젝트 경험을 소개합니다.최신 웹 기술에 대한 열정을 가진 개발자입니다.',
  keywords: '김현진, 웹 개발자, 프론트엔드 개발자, 리액트 개발자, 포트폴리오',
  openGraph: {
    title: '김현진 - 웹 개발자 프로필',
    description: '혁신적인 웹 솔루션을 만드는 열정적인 개발자 김현진을 소개합니다.',
    type: 'profile',
  },
};
export default function Page() {
  return (
    <AboutPageContainer>
      <IntroductionSection />
      <AboutMeSection />
      <WorkExperienceSection />
      <EducationalBackgroundSection />
    </AboutPageContainer>
  );
}
