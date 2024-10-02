import BaseModal from '@/components/Modal/BaseModal';
import ProjectDetail from '@/components/ProjectDetail';
import { getAllProjects, getProjectById } from '@/services/projectSerivce';
import { DetailProject } from '@/model/project';

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function Page({ params: { id } }: Props) {
  const project = getProjectById(id);

  return (
    <BaseModal>
      <ProjectDetail {...(project as DetailProject)} />
    </BaseModal>
  );
}
