import Profile from '@/components/Profile';
import ProjectCarousel from '@/components/ProjectCarousel';
import BlogPostsSection from '@/components/BlogPostsSection';

export default function Home() {
  return (
    <div>
      <Profile />
      <ProjectCarousel />
      <BlogPostsSection />
    </div>
  );
}
