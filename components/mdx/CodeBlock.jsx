import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock = ({ children, className }) => {
  // Extract the language from className (format: "language-xxx")
  const language = className ? className.replace('language-', '') : '';

  return (
    <SyntaxHighlighter
      language={language || 'text'}
      style={vscDarkPlus}
      wrapLines={true}
      showLineNumbers={true}
      wrapLongLines={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;