"use client";

import { useEffect, useState } from "react";

/** Sticky pill bar that jumps to each category block and highlights the one in view */
export function CategoryTabs({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="svc-tabs" aria-label="Service categories">
      <div className="container svc-tabs__row">
        {items.map((i) => (
          <a key={i.id} href={`#${i.id}`} className="svc-tabs__pill" aria-current={active === i.id ? "true" : undefined}>
            {i.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
