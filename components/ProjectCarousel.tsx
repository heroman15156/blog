import BaseSwiper from '@/components/BaseSwiper';
import { getAllProjects } from '@/services/projectSerivce';

export default function ProjectCarousel() {
  const projects = getAllProjects();

  return (
    <section className="w-3/4 mx-auto mt-10">
      <h1 className="text-center my-20 font-bold text-4xl">프로젝트 </h1>
      <BaseSwiper projects={projects} slidesPerViewLarge={3} slidesPerViewSmall={1} />
    </section>
  );
}
