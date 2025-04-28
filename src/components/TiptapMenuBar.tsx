import { Editor } from "@tiptap/react";
import { Bold, Heading1, Heading2, Heading3, Heading4, Italic, List, Strikethrough, Underline } from "lucide-react";
import { FC } from "react";
import { Toggle } from "./ui/toggle";

interface TiptapMenuBarProps {
  editor: Editor | null;
}

const TiptapMenuBar: FC<TiptapMenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const options = [
    {
      icon: <Heading1 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading4 className="size-4" />,
      onclick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Bold className="size-4" />,
      onclick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onclick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onclick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <List className="size-4" />,
      onclick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("underline"),
    },
  ];

  return (
    <div className="space-x-2 rounded-t-md border p-1">
      {options.map((option, index) => {
        return (
          <Toggle
            key={index}
            pressed={option.pressed}
            onClick={() => option.onclick()}
          >
            {option.icon}
          </Toggle>
        );
      })}
    </div>
  );
};

export default TiptapMenuBar;
