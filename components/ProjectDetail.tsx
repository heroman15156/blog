import Image from 'next/image';
import { DetailProject } from '@/model/project';

export default function ProjectDetail({ ...project }: DetailProject) {
  return (
    <div className="bg-white p-5 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-h-[90vh] flex flex-col">
      <div className="relative h-100 sm:h-64 md:h-72 flex-shrink-0">
        <Image
          src={project?.thumbnail as string}
          alt={project.title as string}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {project.title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">기술 스택</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              프로젝트 정보
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              참여 인원: {project.teamSize}명
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              기간: {project.duration?.start} - {project.duration?.end}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              상태: {project.isActive ? '운영중' : '종료됨'}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">주요 기능</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
            {project.keyFeatures?.map((feature, index) => <li key={index}>{feature}</li>)}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm"
          >
            사이트 바로가기
          </a>
        </div>
      </div>
    </div>
  );
}
