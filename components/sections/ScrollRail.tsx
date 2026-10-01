"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pins the card row while the page scrolls and translates it horizontally in
 * step with the vertical scroll (desktop only). On small screens, or with
 * prefers-reduced-motion, it falls back to a normal swipeable row.
 */
export function ScrollRail({ id, label, head, children }: { id: string; label: string; head?: ReactNode; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = outer.current;
    const row = track.current;
    if (!wrap || !row) return;
    const mq = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    let distance = 0;
    let frame = 0;

    const layout = () => {
      if (!mq.matches) {
        wrap.classList.remove("is-pinned");
        wrap.style.height = "";
        row.style.transform = "";
        return;
      }
      wrap.classList.add("is-pinned");
      row.style.transform = "";
      // Stop when the last card sits as far from the right edge as the first
      // card starts from the left edge, so the row ends inside the gutter.
      const last = row.lastElementChild as HTMLElement | null;
      const start = row.getBoundingClientRect().left;
      const end = last ? last.getBoundingClientRect().right : start;
      const viewport = document.documentElement.clientWidth;
      distance = Math.max(0, Math.ceil(end - viewport + Math.max(start, 48)));
      const sticky = wrap.firstElementChild as HTMLElement;
      wrap.style.height = `${sticky.offsetHeight + distance}px`;
      update();
    };

    const update = () => {
      frame = 0;
      if (!mq.matches || !distance) return;
      const top = parseFloat(getComputedStyle(wrap.firstElementChild as Element).top) || 0;
      const progress = Math.min(1, Math.max(0, (top - wrap.getBoundingClientRect().top) / distance));
      row.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    layout();
    // card widths settle once fonts and images are in; measure again then
    document.fonts?.ready.then(layout);
    window.addEventListener("load", layout);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mq.addEventListener("change", layout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      window.removeEventListener("load", layout);
      mq.removeEventListener("change", layout);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={outer} className="wrail">
      <div className="wrail__sticky">
        {head && <div className="wrail__head">{head}</div>}
        <div ref={track} className="wrail__track" id={id} role="region" aria-label={label} tabIndex={0}>
          {children}
        </div>
      </div>
    </div>
  );
}
