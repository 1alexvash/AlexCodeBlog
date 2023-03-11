import React, { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeblockProps {
  children: string | string[];
  language: string | undefined;
}

interface PreTagProps {
  children: ReactNode;
  language: string;
}

interface PreTagElementProps {
  children: ReactNode;
}

const PreTag = ({ children, language }: PreTagProps) => (
  <pre className={`language-${language}`}>{children}</pre>
);

const Codeblock = ({ children, language }: CodeblockProps) => {
  const preTag = ({ children }: PreTagElementProps) => (
    <PreTag language={language ? language : ""}>{children}</PreTag>
  );

  return (
    <SyntaxHighlighter
      language={language}
      codeTagProps={{ className: `language-${language}`, style: {} }}
      useInlineStyles={false}
      PreTag={preTag}
    >
      {children || ""}
    </SyntaxHighlighter>
  );
};

export default Codeblock;
