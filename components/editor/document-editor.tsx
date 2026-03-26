"use client";

import { MarkdownPlugin, deserializeMd } from "@platejs/markdown";
import { Plate, PlateContent, type TPlateEditor, usePlateEditor } from "platejs/react";
import { useEffect } from "react";

import { BasicBlocksKit } from "~/components/editor/plugins/basic-blocks-kit";
import { BasicMarksKit } from "~/components/editor/plugins/basic-marks-kit";

import DocumentToolbar from "./document-toolbar";

interface DocumentEditorProps {
  initialMarkdown: string | undefined;
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
      value: (editor) => deserializeMd(editor, initialMarkdown ?? ""),
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
          className="min-h-55 w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Write your document..."
        />
      </Plate>
    </div>
  );
}
