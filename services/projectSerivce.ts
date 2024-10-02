import projectsData from '@/data/projects.json';

export const getAllProjects = () => {
  return projectsData.projects;
};

export const getProjectById = (id: string) => {
  return projectsData.projects.find((p) => p.id === id);
};
