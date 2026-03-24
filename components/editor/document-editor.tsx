"use client";

import { useEffect } from "react";
import { Plate, PlateContent, type TPlateEditor, usePlateEditor } from "platejs/react";

import { MarkdownPlugin, deserializeMd } from "@platejs/markdown";

import { BasicBlocksKit } from "~/components/editor/plugins/basic-blocks-kit";
import { BasicMarksKit } from "~/components/editor/plugins/basic-marks-kit";

import DocumentToolbar from "./document-toolbar";

interface DocumentEditorProps {
  initialMarkdown: string;
  readOnly?: boolean;
  onEditorReady?: (editor: TPlateEditor) => void;
}

export default function DocumentEditor({
  initialMarkdown,
  readOnly = false,
  onEditorReady,
}: DocumentEditorProps) {
  const editor = usePlateEditor(
    {
      plugins: [...BasicBlocksKit, ...BasicMarksKit, MarkdownPlugin],
      value: (editor) => deserializeMd(editor, initialMarkdown),
    },
    [initialMarkdown],
  );

  useEffect(() => {
    onEditorReady?.(editor);
  }, [editor, onEditorReady]);

  return (
    <div className="w-full">
      {!readOnly ? <DocumentToolbar /> : null}
      <Plate editor={editor} readOnly={readOnly}>
        <PlateContent
          className="min-h-[220px] w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Write your document..."
        />
      </Plate>
    </div>
  );
}
