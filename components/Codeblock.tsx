import { Box } from "@mui/system";
import { FC, ReactNode, useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeblockProps {
  codeLines: string;
  language: string;
}

interface PreTagProps {
  children: ReactNode;
}

const createPreTagByLanguage = (language: string): FC<PreTagProps> => {
  const result: FC<PreTagProps> = (props) => {
    return <pre className={`language-${language}`}>{props.children}</pre>;
  };

  result.displayName = `PreTag_${language}`;

  return result;
};

const Codeblock: FC<CodeblockProps> = ({ codeLines, language }) => {
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
