import fs from 'fs';
import path from 'path';
import postsData from '../data/posts.json';

export type Post = {
  id: string;
  title: string;
  date: string;
  category: string;
  thumbnail: string;
  description: string;
};

export const getAllPosts = () => {
  return postsData.posts;
};

export const getPostById = (id: string) => {
  return postsData.posts.find((post) => post.id === id);
};

export const findPostIndex = (id: string) => {
  const posts = getAllPosts();
  return posts.findIndex((post) => post.id === id);
};

export const getPostContent = (category: string, id: string) => {
  const fullPath = path.join(process.cwd(), 'posts', category, `${id}.md`);
  return fs.readFileSync(fullPath, 'utf8');
};

export const getAdjacentPosts = (id: string) => {
  const posts = getAllPosts();
  const currentIndex = findPostIndex(id);
  if (currentIndex === -1) {
    throw new Error('Post not found');
  }

  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return { previousPost, nextPost };
};
