'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import CodeBlock from './CodeBlock';
import Image from 'next/image';

type Props = {
  content: string;
};

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkdown
      className="prose prose-lg mb-[100px] dark:prose-invert max-w-none text-foreground dark:text-foreground px-4 md:px-0 pb-20"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeCodeTitles, rehypeSlug]}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock language={match[1]}>{String(children).replace(/\n$/, '')}</CodeBlock>
          ) : (
            <code className="bg-gray-100 dark:bg-gray-800 text-sm px-1 py-0.5 rounded" {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="relative p-0 m-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <table className="border-collapse border border-gray-300 dark:border-gray-700 my-4">
            {children}
          </table>
        ),
        th: ({ children }) => (
          <th className="border border-gray-300 dark:border-gray-700 p-2 bg-gray-100 dark:bg-gray-800">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-300 dark:border-gray-700 p-2">{children}</td>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-blue-500 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-3 my-6 pr-3 rounded-r-lg shadow-md">
            <blockquote className="text-blue-800 dark:text-blue-200 italic font-medium m-0">
              {children}
            </blockquote>
          </div>
        ),
        img: ({ src, alt }) => {
          if (!src) return null;

          return (
            <Image
              src={src}
              alt={alt || ''}
              width={1920}
              height={1080}
              layout="responsive"
              objectFit="cover"
              className="rounded-lg my-5"
            />
          );
        },
        h1: ({ children, ...props }) => (
          <h1
            id={props.id}
            className="text-3xl font-bold mt-8 mb-4 text-activeColor dark:text-activeColor"
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            id={props.id}
            className="text-2xl font-semibold mt-6 mb-3 text-activeColor  dark:text-activeColor"
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            id={props.id}
            className="text-xl font-medium mt-4 mb-2 text-activeColor  dark:text-activeColor"
          >
            {children}
          </h3>
        ),
        p: ({ children }) => {
          if (React.isValidElement(children) && children.type === 'img') {
            return <>{children}</>;
          }
          return (
            <p className="p mt-3 mb-5 tracking-[0.02em] [&+ul]:mt-0 break-words">{children}</p>
          );
        },
        ul: ({ children }) => (
          <ul className="list-disc list-inside my-4 text-gray-800 dark:text-gray-200">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside my-4 text-gray-800 dark:text-gray-200">
            {children}
          </ol>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">
            {children}
          </strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
