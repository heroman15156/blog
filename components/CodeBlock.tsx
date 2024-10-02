import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { MdContentPaste } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);

interface CodeBlockProps {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
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
    <div className="relative my-6 overflow-hidden rounded-md code-block-wrapper">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '16px',
          paddingRight: '40px',
          borderRadius: '6px',
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
  );
}
