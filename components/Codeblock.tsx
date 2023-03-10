import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

export interface CodeblockProps {
  children: string | string[];
  language: string | undefined;
}

const Codeblock = ({ children, language }: CodeblockProps) => (
  <SyntaxHighlighter language={language} style={atomOneDark}>
    {children || "const a = 5;"}
  </SyntaxHighlighter>
);

export default Codeblock;
