"use client";

import { useEffect, useRef } from "react";
import type { ContentBlock } from "@/lib/notes";

interface Props {
  initialBlocks?: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

type RawBlock = { type: string; data: Record<string, unknown> };

function normalizeListItems(raw: unknown[]): string[] {
  return raw
    .map((i) => (typeof i === "string" ? i : (i as { content?: string }).content ?? ""))
    .filter(Boolean);
}

function toEditorBlocks(blocks: ContentBlock[]) {
  return blocks.map((b) => {
    switch (b.type) {
      case "image":
        return {
          type: "image",
          data: {
            file: { url: b.content },
            caption: b.caption ?? "",
            stretched: false,
            withBorder: false,
            withBackground: false,
          },
        };
      case "heading":
        return { type: "header", data: { text: b.content, level: b.level ?? 2 } };
      case "quote":
        return {
          type: "quote",
          data: { text: b.content, caption: b.caption ?? "", alignment: "left" },
        };
      case "list":
        return {
          type: "list",
          data: {
            style: b.style ?? "unordered",
            items: (b.items ?? []).map((text) => ({ content: text, meta: {}, items: [] })),
          },
        };
      case "delimiter":
        return { type: "delimiter", data: {} };
      default:
        return { type: "paragraph", data: { text: b.content } };
    }
  });
}

function fromEditorBlocks(blocks: RawBlock[]): ContentBlock[] {
  return blocks
    .map((b): ContentBlock | null => {
      switch (b.type) {
        case "image": {
          const file = b.data.file as { url?: string } | undefined;
          const url = file?.url ?? String(b.data.url ?? "");
          if (!url.trim()) return null;
          return { type: "image", content: url, caption: String(b.data.caption ?? "") };
        }
        case "header":
          if (!String(b.data.text ?? "").trim()) return null;
          return {
            type: "heading",
            content: String(b.data.text ?? ""),
            level: Number(b.data.level ?? 2),
          };
        case "quote":
          if (!String(b.data.text ?? "").trim()) return null;
          return {
            type: "quote",
            content: String(b.data.text ?? ""),
            caption: String(b.data.caption ?? ""),
          };
        case "list": {
          const items = normalizeListItems((b.data.items as unknown[]) ?? []);
          if (!items.length) return null;
          return {
            type: "list",
            content: "",
            style: (b.data.style as "ordered" | "unordered") ?? "unordered",
            items,
          };
        }
        case "delimiter":
          return { type: "delimiter", content: "" };
        default: {
          const text = String(b.data.text ?? "");
          if (!text.trim()) return null;
          return { type: "text", content: text };
        }
      }
    })
    .filter((b): b is ContentBlock => b !== null);
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
      const [
        { default: EditorJS },
        { default: ImageTool },
        { default: Header },
        { default: List },
        { default: Quote },
        { default: Delimiter },
        { default: Marker },
        { default: Underline },
      ] = await Promise.all([
        import("@editorjs/editorjs"),
        import("@editorjs/image"),
        import("@editorjs/header"),
        import("@editorjs/list"),
        import("@editorjs/quote"),
        import("@editorjs/delimiter"),
        import("@editorjs/marker"),
        import("@editorjs/underline"),
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          header:    { class: Header    as any, config: { levels: [2, 3, 4], defaultLevel: 2 } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list:      { class: List      as any, inlineToolbar: true },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          quote:     { class: Quote     as any, inlineToolbar: true },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delimiter: { class: Delimiter as any },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          marker:    { class: Marker    as any, shortcut: "CMD+SHIFT+M" },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          underline: { class: Underline as any, shortcut: "CMD+U" },
        },
        inlineToolbar: ["bold", "italic", "underline", "marker", "link"],
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
