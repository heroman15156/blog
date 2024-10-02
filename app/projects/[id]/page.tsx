import ProjectDetail from '@/components/ProjectDetail';
import { getAllProjects, getProjectById } from '@/services/projectSerivce';
import { DetailProject } from '@/model/project';
import { Metadata, ResolvingMetadata } from 'next';

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

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = getProjectById(params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${project.title} | 김현진의 프로젝트`,
    description: project.description || `${project.title} 프로젝트 상세 정보`,
    openGraph: {
      title: project.title,
      description: project.description || `${project.title} 프로젝트 상세 정보`,
      type: 'article',
      // url: `https://your-website.com/projects/${project.id}`,
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description || `${project.title} 프로젝트 상세 정보`,
      images: [project.thumbnail],
    },
  };
}

export default function Page({ params: { id } }: Props) {
  const project = getProjectById(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectDetail {...(project as DetailProject)} />
    </div>
  );
}
