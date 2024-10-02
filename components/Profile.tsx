import Image from 'next/image';
import TechStackSection from '@/components/TechStackSection';

export default function Profile() {
  return (
    <section className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8 p-6 bg-whiteBg dark:bg-background rounded-lg">
      <div className="relative w-48 h-48 lg:w-56 lg:h-56 flex-shrink-0 rounded-full bg-white dark:bg-darkBgSecondary border-[2px] border-gray-300 dark:border-gray-600 overflow-hidden shadow-lg">
        <Image
          src="/about-background-img.jpeg"
          alt="김현진 프로필 이미지"
          className="rounded-full object-cover"
          fill={true}
          sizes="(max-width: 768px) 192px, 224px"
        />
      </div>

      <div className="flex flex-col text-center lg:text-left flex-grow">
        <div className="flex flex-col lg:flex-row items-center lg:items-start mb-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mr-3">
            김현진
          </h1>
          <span className="mt-2 lg:mt-0 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium animate-pulse">
            블로그 운영중
          </span>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          안녕하세요, 김현진입니다. 프론트엔드 개발자로서 사용자 경험을 극대화하는 웹 애플리케이션
          개발에 관심이 많습니다. 저는 혁신적인 기술과 창의적인 디자인을 결합하여 사용자 중심의
          솔루션을 만드는 것에 열정을 가지고 있습니다.
        </p>
        <TechStackSection />
      </div>
    </section>
  );
}
