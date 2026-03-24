"use client";

import { useEffect, useState } from "react";
import type { TPlateEditor } from "platejs/react";

import { serializeMd } from "@platejs/markdown";

import DocumentEditor from "~/components/editor/document-editor";
import { GenerateDocumentUIToolInvocation } from "~/lib/ai/tools/generate-document";

import Spinner from "../ai/spinner";
import { Button } from "../ui/button";

export default function DocumentGenerationView({
  invocation,
}: {
  invocation: GenerateDocumentUIToolInvocation;
}) {
  switch (invocation.state) {
    case "input-available":
      return (
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          <span>Generating document…</span>
        </div>
      );
    case "output-error":
      return <div className="mb-2 text-sm text-red-500">Error generating document</div>;
    case "output-available":
      return <DocumentOutput invocation={invocation} />;
  }
}

function DocumentOutput({ invocation }: { invocation: GenerateDocumentUIToolInvocation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(invocation.output.title ?? "Untitled Document");
  const [draftMarkdown, setDraftMarkdown] = useState(invocation.output.markdown);
  const [editor, setEditor] = useState<TPlateEditor | null>(null);

  useEffect(() => {
    setTitle(invocation.output.title ?? "Untitled Document");
    setDraftMarkdown(invocation.output.markdown);
    setIsEditing(false);
  }, [invocation.output.markdown, invocation.output.title]);

  const handleToggleEdit = () => {
    if (isEditing && editor) {
      const nextMarkdown = serializeMd(editor, { value: editor.children });
      setDraftMarkdown(nextMarkdown);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="mb-2 w-full max-w-3xl rounded-md border bg-background p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium">{title}</div>
        <Button size="sm" variant="outline" onClick={handleToggleEdit}>
          {isEditing ? "Done" : "Edit"}
        </Button>
      </div>
      <div className="mt-3">
        <DocumentEditor
          initialMarkdown={draftMarkdown}
          readOnly={!isEditing}
          onEditorReady={(nextEditor) => setEditor(nextEditor)}
        />
      </div>
    </div>
  );
}
