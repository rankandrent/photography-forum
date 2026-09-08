import { renderMarkdown } from "@/lib/markdown";

/**
 * The HTML here is produced by our own renderer, which escapes all user input
 * before adding tags — see src/lib/markdown.ts. Do not pass raw user HTML in.
 */
export function MarkdownContent({ source, className = "" }: { source: string; className?: string }) {
  return (
    <div
      className={`prose-post text-[15px] text-slate-700 dark:text-slate-300 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(source) }}
    />
  );
}
