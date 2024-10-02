import { FaCode, FaGithub } from 'react-icons/fa';

import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const version = '1.0.0';
  const lastDeployDate = '2024-04-01';

  return (
    <footer className="bg-background dark:bg-background text-gray-600 dark:text-gray-300">
      <div className="border-t border-gray-200 dark:border-gray-700"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              김현진의 블로그
            </h2>
            <p className="text-sm">기록의 소중함</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/wmc115156"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <FaGithub size={24} />
            </a>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <div className="flex items-center text-sm">
              <FaCode className="mr-2 text-gray-400" />
              <span>with passion</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div>© {currentYear} 김현진. All rights reserved.</div>
          <div className="mt-2 sm:mt-0">
            버전: {version} | 최근 배포일: {lastDeployDate}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
