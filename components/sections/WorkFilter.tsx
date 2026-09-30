"use client";

import { Children, useState, type ReactNode } from "react";

type Option = { slug: string; title: string };

/**
 * Client-side filter for the Work page. `keys[i]` lists the industry/service slugs
 * of the i-th child card; cards not matching the active chip are hidden.
 */
export function WorkFilter({
  industries,
  services,
  keys,
  children,
}: {
  industries: Option[];
  services: Option[];
  keys: string[][];
  children: ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const cards = Children.toArray(children);
  const visible = cards.filter((_, i) => !active || keys[i]?.includes(active)).length;

  const chip = (o: Option | null) => {
    const slug = o?.slug ?? null;
    return (
      <button
        key={slug ?? "all"}
        type="button"
        className="wfilter__chip"
        aria-pressed={active === slug}
        onClick={() => setActive(slug)}
      >
        {o?.title ?? "All work"}
      </button>
    );
  };

  return (
    <>
      <div className="wfilter" role="group" aria-label="Filter case studies">
        {chip(null)}
        {industries.map(chip)}
        {!!services.length && <span className="wfilter__sep" aria-hidden="true" />}
        {services.map(chip)}
      </div>
      <p className="visually-hidden" role="status">{visible} case studies shown</p>
      <div className="wmasonry">
        {cards.map((card, i) => (
          <div key={i} className="wmasonry__item" hidden={!!active && !keys[i]?.includes(active)}>
            {card}
          </div>
        ))}
      </div>
    </>
  );
}
