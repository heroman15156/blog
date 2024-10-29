import { getAdjacentPosts } from '@/services/postService';

import MarkdownViewer from '@/components/MarkdownViewer';
import Comments from '@/components/Comments';
import PostNavigation from '@/components/PostNavigation';
import TableOfContents from '@/components/TableOfContents';
import ScrollProgress from '@/components/ScrollProgress';
import Image from 'next/image';

type BlogPostDetailProps = {
  title: string;
  date: string;
  category: string;
  content: string;
  id: string;
  thumbnail: string;
};

export default function BlogPostDetail({
  title,
  date,
  category,
  content,
  id,
  thumbnail,
}: BlogPostDetailProps) {
  const { previousPost, nextPost } = getAdjacentPosts(id);
  const isVideo = thumbnail.toLowerCase().endsWith('.mov');

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen w-full bg-background dark:bg-background">
      <ScrollProgress />
      <div className="w-full lg:w-3/4 max-w-4xl px-0 md:py-[50px] lg:px-8">
        <article className="bg-background dark:bg-background rounded-lg overflow-hidden">
          {/* Post header */}
          <header className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="font-bold text-foreground dark:text-foreground mb-4 lg:text-5xl text-4xl">
              <span className="leading-[50px] sm:leading-[70px]">{title}</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-2 md:mb-0">
                <span className="text-foreground dark:text-foreground text-sm md:text-base">
                  {/*{author}*/}
                </span>
                <span className="text-foreground dark:text-foreground text-sm md:text-base">
                  {date}
                </span>
              </div>
              {/*<div className="space-x-2">*/}
              {/*  <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">*/}
              {/*    <FaEdit size={18} />*/}
              {/*  </button>*/}
              {/*  <button className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">*/}
              {/*    <FaTrash size={18} />*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
          </header>

          {/* Categories */}
          <div className="px-4 md:px-6 py-3 md:py-4 bg-background dark:bg-background">
            <div className="flex flex-wrap gap-2">
              <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs md:text-sm font-medium">
                {category}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center bg-background mt-5 dark:bg-background">
            <div className="w-full max-w-[700px] aspect-[7/4]">
              {isVideo ? (
                <video
                  style={{
                    pointerEvents: 'none',
                  }}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={thumbnail}
                  controls
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={thumbnail}
                  alt="Post thumbnail"
                  objectFit="cover"
                  width={400}
                  height={400}
                  style={{ width: '100%', height: '100%' }}
                />
              )}{' '}
            </div>
          </div>

          <div className="mt-8 md:px-4">
            <MarkdownViewer content={content} />
          </div>
          <Comments />
          <div className="px-4 md:px-6 lg:px-8">
            <PostNavigation previousPost={previousPost} nextPost={nextPost} />
          </div>
        </article>
      </div>
      <div className="hidden lg:block lg:w-1/4 p-4">
        <TableOfContents content={content} />
      </div>
    </div>
  );
}
