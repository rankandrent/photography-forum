"use client";

import { useId, useState, type FormEvent } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";

/** Single-field email form (lead magnet, newsletter). Posts to the same endpoint as LeadForm. */
export function EmailCapture({
  source,
  cta,
  className,
  buttonClassName = "btn",
  inputStyle,
}: {
  source: string;
  cta: string;
  className: string;
  buttonClassName?: string;
  inputStyle?: React.CSSProperties;
}) {
  const id = useId();
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    if (!ENDPOINT) return setMsg("Form endpoint is not configured yet.");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source, page: window.location.href }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setMsg("Thanks — our team will email you the checklist within one business day.");
    } catch {
      setMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <form className={className} onSubmit={onSubmit}>
      <label className="visually-hidden" htmlFor={id}>Work email</label>
      <input id={id} type="email" name="email" placeholder="Work email" autoComplete="email" required style={inputStyle} />
      <button type="submit" className={buttonClassName}>{cta}</button>
      {msg && <p role="status" style={{ flexBasis: "100%", fontSize: 14 }}>{msg}</p>}
    </form>
  );
}
