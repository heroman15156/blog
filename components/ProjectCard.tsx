import React from 'react';
import { DetailProject } from '@/model/project';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export default function ProjectCard({ project }: { project: DetailProject }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative h-[500px] flex flex-col" // 높이를 고정하고 flex-col 추가
    >
      <div className="absolute top-2 right-2 z-10">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            project.type === 'freelance' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {project.type === 'freelance' ? '프리랜서' : '개인'}
        </span>
      </div>
      <img src={project.thumbnail} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack!.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto">
          {' '}
          {/* mt-auto 추가 */}
          <Link
            href={`/projects/${project.id}`}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            자세히 보기
          </Link>
          <div className="flex space-x-4">
            {project.type === 'personal' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaGithub size={20} />
              </a>
            )}
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaExternalLinkAlt size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
