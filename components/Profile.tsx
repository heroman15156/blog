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
          안녕하세요, 김현진입니다. 효율적인 커뮤니케이션과 책임감 있는 업무 수행을 중요하게
          생각하는 프론트엔드 개발자입니다. 사용자의 불편함을 세심하게 캐치하고 개선하는 것에 관심이
          많으며, 팀원들과의 협업을 통해 더 나은 서비스를 만들어가는 것에 열정을 가지고 있습니다.
        </p>
        <TechStackSection />
      </div>
    </section>
  );
}
