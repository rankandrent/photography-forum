/** Renders trusted HTML from the repo's own content files (inline links in FAQ answers etc.) */
export function Html({ html, as: Tag = "div", className }: { html: string; as?: "div" | "p" | "span"; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
