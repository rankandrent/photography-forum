/**
 * A deliberately small Markdown renderer.
 *
 * Forum posts are the classic stored-XSS target, so this escapes every input
 * character FIRST and only then re-introduces the handful of tags we allow.
 * There is no path by which user HTML reaches the page. If you later swap in
 * `marked`, you must add a sanitiser (DOMPurify) — do not drop that step.
 */

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

function inline(text: string): string {
  return (
    text
      // `code`
      .replace(/`([^`\n]+)`/g, '<code class="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] dark:bg-slate-800">$1</code>')
      // **bold**
      .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
      // *italic*
      .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
      // [label](https://…) — http(s) and relative links only
      .replace(
        /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
        (match, label, href) => {
          const isExternal = href.startsWith("http://") || href.startsWith("https://");
          const rel = isExternal ? 'rel="ugc nofollow sponsored noopener" target="_blank"' : 'rel="ugc nofollow"';
          return `<a class="text-sky-600 underline underline-offset-2 hover:text-sky-500 dark:text-sky-400" href="${href}" ${rel}>${label}</a>`;
        }
      )
  );
}

export function renderMarkdown(source: string): string {
  const escaped = escapeHtml(source.replace(/\r\n/g, "\n"));
  const lines = escaped.split("\n");
  const out: string[] = [];
  let inList = false;
  let inCode = false;
  const codeBuffer: string[] = [];

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        out.push(
          `<pre class="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100"><code>${codeBuffer.join("\n")}</code></pre>`,
        );
        codeBuffer.length = 0;
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      closeList();
      const level = heading[1].length + 1; // never emit <h1> inside a post
      out.push(
        `<h${level} class="mt-6 mb-2 font-semibold text-slate-900 dark:text-slate-100">${inline(heading[2])}</h${level}>`,
      );
      continue;
    }

    if (/^&gt;\s?/.test(line)) {
      closeList();
      out.push(
        `<blockquote class="my-3 border-l-4 border-slate-300 pl-4 text-slate-600 dark:border-slate-600 dark:text-slate-400">${inline(line.replace(/^&gt;\s?/, ""))}</blockquote>`,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      if (!inList) {
        out.push('<ul class="my-3 list-disc space-y-1 pl-6">');
        inList = true;
      }
      out.push(`<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }

    closeList();
    if (line.trim() === "") continue;
    out.push(`<p class="my-3 leading-7">${inline(line)}</p>`);
  }

  closeList();
  if (inCode && codeBuffer.length) {
    out.push(
      `<pre class="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100"><code>${codeBuffer.join("\n")}</code></pre>`,
    );
  }
  return out.join("\n");
}

/** Plain-text version for meta descriptions and search snippets. */
export function toPlainText(source: string, limit = 200): string {
  const text = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*`_~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
}
