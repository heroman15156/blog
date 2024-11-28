export default function WorkExperienceSection() {
  const experiences = [
    {
      company: '무직',
      period: '2024.02(현재)',
      description: '1:1 React 개인과외 및 간단한 웹 유지보수 업무',
    },
    {
      company: 'Bytesmix(Freelancer)',

      period: '2021.10 - 2024.01',
      description: (
        <div>
          <p>
            프리랜서 웹 개발자로 다양한 프로젝트를 수행하며 프론트엔드 개발 전문성을 쌓았습니다:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>NFT 웹 프론트엔드 개발: React를 주력으로 사용하여 다수의 NFT 관련 웹사이트 구축</li>
            <li>Web3 기술 통합: MetaMask 등 암호화폐 지갑 로그인 및 통신</li>
            <li>다양한 클라이언트 대응: 여러 회사의 웹사이트 유지보수 및 기능 개선 작업 수행</li>
            <li>
              어드민 시스템 개발: 효율적인 데이터 관리와 운영을 위한 맞춤형 어드민 페이지 설계 및
              구현
            </li>
            <li>
              새로운 기술 습득 및 적용: 프로젝트 요구사항에 따라 신기술을 신속하게 학습하고 실제
              개발에 적용
            </li>
          </ul>
          <p className="mt-2">
            이 기간 동안 다양한 프로젝트와 기술 스택을 경험하며, 복잡한 요구사항을 효과적으로
            해결하는 능력을 키웠습니다. 특히, 빠르게 변화하는 웹 기술 트렌드에 대한 적응력과 학습
            능력을 크게 향상시켰습니다.
          </p>
        </div>
      ),
    },
    {
      company: '더스윙',
      period: '2021.06 - 2021.09',
      description: (
        <div>
          <p>백엔드 개발자로 입사하여 다음과 같은 주요 프로젝트를 수행했습니다:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>레거시 코드 현대화: Express에서 Nest.js로 백엔드 시스템 전환</li>
            <li>
              어드민 시스템 개선: React와 Ant Design (Antd)를 활용하여 기존 저성능 어드민 페이지를
              완전히 새롭게 리뉴얼, 사용자 경험과 관리 효율성 크게 향상
            </li>

            <li>
              지도 서비스 전환: 구글 맵에서 카카오 맵으로 전환하고, 킥보드 메타데이터 표시 기능 구현
            </li>
          </ul>
          <p className="mt-2">
            이러한 작업을 통해 시스템의 성능과 사용자 경험을 크게 개선했습니다.
          </p>
        </div>
      ),
    },
  ];
  return (
    <section className="py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-12 inline-block">
          Work Experience
          <div className="h-[0.5rem] bg-gray-300 dark:bg-gray-600 mt-2"></div>
        </h2>
        <div className="relative">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-8 flex flex-col md:flex-row">
              <div className="flex-none w-full md:w-64 mb-4 md:mb-0">
                <div className="sticky top-0 pt-4">
                  <span className="text-3xl font-bold text-blue-500">
                    {exp.period.split(' - ')[0].split('.')[0]}
                  </span>
                  <div className="text-lg text-gray-600 dark:text-gray-400">{exp.period}</div>
                </div>
              </div>
              <div className="flex-grow md:pl-8 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-300 dark:bg-blue-700 transform -translate-x-1/2 md:block hidden"></div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md relative">
                  <div className="absolute top-6 left-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 md:block hidden"></div>
                  <h3 className="text-2xl font-bold mb-2">{exp.company}</h3>
                  <div className="text-gray-700 dark:text-gray-300">{exp.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
