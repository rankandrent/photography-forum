export function Prose({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
      {updated && <p className="mt-1 text-sm text-slate-400">Last updated {updated}</p>}
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-slate-600 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_li]:ml-5 [&_li]:list-disc dark:text-slate-400 dark:[&_h2]:text-slate-100">
        {children}
      </div>
    </div>
  );
}
