"use client";

import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FC } from "react";
import TiptapMenuBar from "./TiptapMenuBar";
import { Label } from "./ui/label";

interface TiptapRichtextEditorProps {
  label: string;
  field: string;
  content: string;
  isTouch: boolean | undefined;
  onChange: (content: string) => void;
  setError: (field: string, value: string | undefined) => void;
  setTouch: (field: string, value: boolean | undefined) => void;
  showError: boolean | undefined;
}

const TiptapRichtextEditor: FC<TiptapRichtextEditorProps> = ({
  label,
  field,
  content,
  isTouch,
  onChange,
  setError,
  setTouch,
  showError,
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert", // @tailwindcss/typography plugin
          "border rounded-b-md",
          "p-3", // padding
          "leading-[1.4] min-h-[156px] max-w-none", // height, width and line height
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => {
      setTouch(field, true);
    },
    onBlur: () => {
      if (editor?.isEmpty) setError(field, `${label} is required`);
    },
  });

  return (
    <div>
      <Label className="my-2">{label}</Label>
      <TiptapMenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor?.isEmpty && isTouch && showError && (
        <p className="text-md text-red-500">{label} is Required</p>
      )}
    </div>
  );
};

export default TiptapRichtextEditor;
