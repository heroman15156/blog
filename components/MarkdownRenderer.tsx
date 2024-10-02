'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div data-color-mode={resolvedTheme} className="markdown-body w-full">
      <MDEditor
        value={content}
        preview="preview"
        hideToolbar={true}
        visibleDragbar={false}
        style={{
          backgroundColor: 'transparent',
          color: 'inherit',
          height: 'auto',
        }}
        previewOptions={{
          style: {
            backgroundColor: 'transparent',
            color: 'inherit',
            padding: '0',
          },
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;
