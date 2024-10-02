import { getAllPosts } from '@/services/postService';
import PostItem from '@/components/PostItem';

export default function BlogPostsSection() {
  const posts = getAllPosts();

  return <PostItem initialPosts={posts} />;
}
