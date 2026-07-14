"use client";

import { useEffect, useRef } from "react";
import type { ContentBlock } from "@/lib/notes";

interface Props {
  initialBlocks?: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

function toEditorBlocks(blocks: ContentBlock[]) {
  return blocks.map((b) =>
    b.type === "image"
      ? { type: "image",     data: { file: { url: b.content }, caption: b.caption ?? "", stretched: false, withBorder: false, withBackground: false } }
      : { type: "paragraph", data: { text: b.content } },
  );
}

function fromEditorBlocks(blocks: { type: string; data: Record<string, unknown> }[]): ContentBlock[] {
  return blocks
    .map((b) => {
      if (b.type === "image") {
        const file = b.data.file as { url?: string } | undefined;
        return { type: "image" as const, content: file?.url ?? String(b.data.url ?? ""), caption: String(b.data.caption ?? "") };
      }
      return { type: "text" as const, content: String(b.data.text ?? ""), caption: "" };
    })
    .filter((b) => b.content.trim());
}

export function NoteEditor({ initialBlocks, onChange }: Props) {
  const holderRef   = useRef<HTMLDivElement>(null);
  const editorRef   = useRef<unknown>(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  useEffect(() => {
    if (!holderRef.current || editorRef.current) return;

    let destroyed = false;

    (async () => {
      const [{ default: EditorJS }, { default: ImageTool }] = await Promise.all([
        import("@editorjs/editorjs"),
        import("@editorjs/image"),
      ]);

      if (destroyed || !holderRef.current) return;

      const editorBlocks = toEditorBlocks(initialBlocks ?? []);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editorRef.current = new EditorJS({
        holder: holderRef.current,
        tools: {
          image: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            class: ImageTool as any,
            config: { endpoints: { byFile: "/api/admin/upload-editorjs" } },
          },
        },
        data: editorBlocks.length ? { blocks: editorBlocks } : undefined,
        placeholder: "Write your note here…",
        onChange: async () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const output = await (editorRef.current as any).save();
          onChangeRef.current(fromEditorBlocks(output.blocks));
        },
      });
    })();

    return () => {
      destroyed = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (editorRef.current as any)?.destroy?.();
      editorRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={holderRef}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--surface-2)",
        padding: "12px 0",
        minHeight: "280px",
      }}
    />
  );
}
