import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
}

const CardMarkdown: React.FC<MarkdownProps> = ({ content }) => {
  const renderers: Components = {
    h1: ({ children }) => <div className="text-sm">{children}</div>,
    h2: ({ children }) => <div className="text-sm">{children}</div>,
    h4: ({ children }) => <div className="text-sm">{children}</div>,
    h3: ({ children }) => <div className="text-sm">{children}</div>,
    p: ({ children }) => <div className="text-sm">{children}</div>,
    ol: ({ children }) => <div className="text-sm">{children}</div>,
    li: ({ children }) => <ul className="text-sm">{children}</ul>,
    u: ({ children }) => <div className="underline">{children}</div>,
    strong: ({ children }) => (
      <strong className="font-medium">{children}</strong>
    ),
  };
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default CardMarkdown;
