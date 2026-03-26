"use client";

import { serializeMd } from "@platejs/markdown";
import type { TPlateEditor } from "platejs/react";
import { useEffect, useState } from "react";

import DocumentEditor from "~/components/editor/document-editor";
import { GenerateDocumentUIToolInvocation } from "~/lib/ai/tools/generate-document";
import { trpc } from "~/lib/backend/trpc/client";

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
      return <DocumentOutput result={invocation.output.documentId ?? ""} />;
  }
}

function DocumentOutput({ result }: { result: string }) {
  const { data: document, isPending } = trpc.chat.getDocument.useQuery({ id: result });
  const [isEditing, setIsEditing] = useState(false);
  const [markdown, setMarkdown] = useState<string | undefined>();
  const [editor, setEditor] = useState<TPlateEditor | null>(null);
  const saveDocument = trpc.chat.updateDocument.useMutation();
  console.log("document", document);
  const handleToggleEdit = () => {
    if (isEditing && editor) {
      const nextMarkdown = serializeMd(editor, { value: editor.children });
      setMarkdown(nextMarkdown);
      saveDocument.mutate({
        id: result,
        content: nextMarkdown,
      });
    }
    setIsEditing((prev) => !prev);
  };
  useEffect(() => {
    if (document?.content) {
      setMarkdown(document.content);
    }
  }, [document]);
  return isPending ? null : (
    <div className="mb-2 w-full max-w-3xl rounded-md border bg-background p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium">{document?.title}</div>
        <div className="flex flex-col gap-2">
          <Button size="sm" variant="outline" onClick={handleToggleEdit}>
            {isEditing ? "Done" : "Edit"}
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <DocumentEditor
          initialMarkdown={markdown}
          readOnly={!isEditing}
          onEditorReady={(nextEditor) => setEditor(nextEditor)}
        />
      </div>
    </div>
  );
}
