import { Box } from "@mui/system";
import { ReactNode, useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeblockProps {
  codeLines: string;
  language: string;
}

interface PreTagProps {
  children: ReactNode;
}

const createPreTagByLanguage = (language: string) => {
  const result = (props: PreTagProps) => {
    return <pre className={`language-${language}`}>{props.children}</pre>;
  };

  return result;
};

const Codeblock = ({ codeLines, language }: CodeblockProps) => {
  const preTag = useMemo(() => createPreTagByLanguage(language), [language]);

  return (
    <Box component="div" className="syntax-highlighting">
      <SyntaxHighlighter
        language={language}
        codeTagProps={{ className: `language-${language}` }}
        useInlineStyles={false}
        PreTag={preTag}
      >
        {codeLines}
      </SyntaxHighlighter>
    </Box>
  );
};

export default Codeblock;
