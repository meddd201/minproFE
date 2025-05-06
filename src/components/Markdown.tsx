import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const renderers: Components = {
    h1: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
    h2: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
    h3: ({ children }) => <h4 className="text-md font-bold">{children}</h4>,
    h4: ({ children }) => <h5 className="text-sm font-bold">{children}</h5>,
    p: ({ children }) => <div className="text-sm">{children}</div>,
    ol: ({ children }) => <ol className="text-md font-bold">{children}</ol>,
    li: ({ children }) => <ul className="text-md font-light">{children}</ul>,
    u: ({ children }) => <p className="underline">{children}</p>,
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

export default Markdown;
