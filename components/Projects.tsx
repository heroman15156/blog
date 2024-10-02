'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DetailProject } from '@/model/project';
import { getAllProjects } from '@/services/projectSerivce';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  const projects: DetailProject[] = getAllProjects();
  const [filter, setFilter] = useState<string>('');

  const filteredProjects = projects.filter((project) =>
    project.techStack!.some((tech) => tech.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        내 프로젝트
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        주로 제가 프리랜서로 참여한 프로젝트들을 소개합니다. 다양한 클라이언트와의 협업을 통해 얻은
        실무 경험과 기술력을 확인하실 수 있습니다. 또한, 개인 프로젝트도 업데이트 예정입니다.
        프리랜서 프로젝트 전부를 올리지 못하였지만, 어드민사이트 및 어드민사이트 백엔드 개발,
        외주사이트 유지보수 업무 등 여러업무도 담당하였습니다.
      </p>

      <div className="mb-8">
        <input
          type="text"
          placeholder="기술 스택으로 필터링..."
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
}
