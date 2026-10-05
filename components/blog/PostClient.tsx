"use client";

import { useEffect, useState } from "react";

/** Thin pink bar under the header that fills as the article is read */
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".post-article");
    const on = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return <div className="readbar" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

/** Highlights the table-of-contents entry for the section in view */
export function TocSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".ptoc a[href^='#']")];
    const heads = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter((h): h is HTMLElement => !!h);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          links.forEach((a) => a.classList.toggle("is-on", a.hash === `#${e.target.id}`));
        }
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);
  return null;
}

export function CopyLink() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="pshare__btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {}
      }}
    >
      {done ? "Copied" : "Copy link"}
    </button>
  );
}
