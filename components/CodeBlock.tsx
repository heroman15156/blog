import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { MdContentPaste } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('json', json);
interface CodeBlockProps {
  language: string;
  children: string;
  title?: string;
}

export default function CodeBlock({ language, children, title }: CodeBlockProps) {
  const [isOpenCodeCopyModal, setIsOpenCodeCopyModal] = useState(false);

  const copyCodeBlock = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setIsOpenCodeCopyModal(true);
          setTimeout(() => setIsOpenCodeCopyModal(false), 800);
        })
        .catch(() => alert('복사를 다시 시도해주세요.'));
    }
  };

  return (
    <div className="relative my-6 rounded-md code-block-wrapper">
      {/* 파일명 표시 */}
      {title && (
        <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-200 bg-[#2D2D2D] border-b border-[#3E3E3E]">
          {title}
        </div>
      )}
      <div className="relative overflow-hidden">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '16px',
            paddingRight: '40px',
            borderRadius: title ? '0 0 6px 6px' : '6px',
            fontSize: '14px',
            backgroundColor: '#1E1E1E',
          }}
        >
          {children}
        </SyntaxHighlighter>
        <div className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center bg-[#2D2D2D] rounded">
          {isOpenCodeCopyModal ? (
            <FaCircleCheck className="w-5 h-5 text-green-500 transition" />
          ) : (
            <button
              onClick={() => copyCodeBlock(children)}
              className="p-1 hover:bg-[#3E3E3E] rounded transition-colors"
              aria-label="Copy code"
            >
              <MdContentPaste className="w-5 h-5 text-gray-400 hover:text-white transition" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
