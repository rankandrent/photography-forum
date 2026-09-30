"use client";

export function RailButtons({ target }: { target: string }) {
  const scroll = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16), behavior: "smooth" });
  };
  return (
    <div className="wrail__btns">
      <button type="button" className="wrail__btn" aria-label="Previous case studies" aria-controls={target} onClick={() => scroll(-1)}>←</button>
      <button type="button" className="wrail__btn" aria-label="Next case studies" aria-controls={target} onClick={() => scroll(1)}>→</button>
    </div>
  );
}
