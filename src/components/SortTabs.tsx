import Link from "next/link";

const TABS = [
  { key: "latest", label: "Latest activity" },
  { key: "new", label: "Newest" },
  { key: "top", label: "Top" },
  { key: "unanswered", label: "Unanswered" },
];

export function SortTabs({ basePath, active }: { basePath: string; active: string }) {
  return (
    <nav aria-label="Sort threads" className="flex gap-1 overflow-x-auto border-b border-slate-200 px-2 dark:border-slate-800">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={tab.key === "latest" ? basePath : `${basePath}?sort=${tab.key}`}
          aria-current={active === tab.key ? "page" : undefined}
          className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition ${
            active === tab.key
              ? "border-brand-600 text-brand-600"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
