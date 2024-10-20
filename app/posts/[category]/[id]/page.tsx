import { getAllPosts, getPostById, getPostContent } from '@/services/postService';

import { notFound } from 'next/navigation';
import BlogPostDetail from '@/components/BlogPostDetail';
import { Metadata } from 'next';

type Props = {
  params: {
    category: string;
    id: string;
  };
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    category: post.category,
    id: post.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostById(params.id);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | 김현진의 블로그`,
    description: post.description || `${post.title}에 대한 블로그 포스트입니다.`,
    openGraph: {
      title: post.title,
      description: post.description || `${post.title}에 대한 블로그 포스트입니다.`,
      type: 'article',
      publishedTime: post.date,
      authors: ['김현진'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || `${post.title}에 대한 블로그 포스트입니다.`,
    },
  };
}

export default async function Page({ params: { id, category } }: Props) {
  const post = getPostById(id);

  if (!post) {
    notFound();
  }
  const content = getPostContent(category, id);

  console.log(content, post);

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-background dark:bg-background">
      <BlogPostDetail
        title={post.title}
        date={post.date}
        category={category}
        content={content}
        id={id}
        thumbnail={post.thumbnail}
      />
    </div>
  );
}
