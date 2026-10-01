"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";

type Status = { kind: "idle" | "sending" | "ok" | "err"; msg?: string };

/**
 * One lead form used in the home hero, inner-page heroes, the final CTA and /contact.
 * Posts JSON to NEXT_PUBLIC_FORM_ENDPOINT (Formspree, Web3Forms, HubSpot, Zapier webhook…).
 */
export function LeadForm({
  variant = "compact",
  interests,
  source,
  submitLabel = "Get my free consultation",
}: {
  variant?: "compact" | "full";
  interests: string[];
  /** Which page/form the lead came from, sent with the payload */
  source: string;
  submitLabel?: string;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.company_website) return; // honeypot
    delete data.company_website;

    if (!ENDPOINT) {
      setStatus({ kind: "err", msg: "Form endpoint is not configured yet (NEXT_PUBLIC_FORM_ENDPOINT)." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, source, page: window.location.href }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "ok", msg: "Thanks — a design lead will get back to you within one business day." });
    } catch {
      setStatus({ kind: "err", msg: "Something went wrong. Please try again or email us directly." });
    }
  }

  const f = (name: string) => `${id}-${name}`;

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate={false}>
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor={f("hp")}>Leave this empty</label>
        <input id={f("hp")} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {variant === "full" ? (
        <>
          <label className="visually-hidden" htmlFor={f("interest")}>Interest</label>
          <select id={f("interest")} name="interest" required defaultValue="">
            <option value="" disabled>I&apos;m interested in…</option>
            {interests.map((o) => <option key={o}>{o}</option>)}
            <option>Other</option>
          </select>
          <div className="lead-form__row">
            <label className="visually-hidden" htmlFor={f("fname")}>First name</label>
            <input id={f("fname")} name="first_name" placeholder="First name*" autoComplete="given-name" required />
            <label className="visually-hidden" htmlFor={f("lname")}>Last name</label>
            <input id={f("lname")} name="last_name" placeholder="Last name*" autoComplete="family-name" required />
          </div>
          <label className="visually-hidden" htmlFor={f("email")}>Work email</label>
          <input id={f("email")} type="email" name="email" placeholder="Work email*" autoComplete="email" required />
          <label className="visually-hidden" htmlFor={f("job")}>Job title</label>
          <input id={f("job")} name="job_title" placeholder="Job title*" autoComplete="organization-title" required />
          <label className="visually-hidden" htmlFor={f("phone")}>Phone</label>
          <input id={f("phone")} type="tel" name="phone" placeholder="Phone" autoComplete="tel" />
          <label className="visually-hidden" htmlFor={f("desc")}>Project description</label>
          <textarea id={f("desc")} name="description" placeholder="Tell us about your product and design goals" />
          <label className="lead-form__consent">
            <input type="checkbox" name="marketing_consent" />
            <span>I agree to receive marketing communications from uiuxdesignservices.us.</span>
          </label>
        </>
      ) : (
        <>
          <label className="visually-hidden" htmlFor={f("name")}>Full name</label>
          <input id={f("name")} name="name" placeholder="Full name*" autoComplete="name" required />
          <div className="lead-form__row">
            <label className="visually-hidden" htmlFor={f("email")}>Work email</label>
            <input id={f("email")} type="email" name="email" placeholder="Work email*" autoComplete="email" required />
            <label className="visually-hidden" htmlFor={f("phone")}>Phone</label>
            <input id={f("phone")} type="tel" name="phone" placeholder="Phone" autoComplete="tel" />
          </div>
          <label className="visually-hidden" htmlFor={f("interest")}>Service</label>
          <select id={f("interest")} name="interest" required defaultValue="">
            <option value="" disabled>Service you need*</option>
            {interests.map((o) => <option key={o}>{o}</option>)}
            <option>Other</option>
          </select>
          <label className="visually-hidden" htmlFor={f("desc")}>Project details</label>
          <textarea id={f("desc")} name="description" placeholder="Briefly describe your product or project" />
        </>
      )}

      <button type="submit" className="btn" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : submitLabel}
      </button>

      {status.msg && (
        <p role="status" className={`lead-form__status lead-form__status--${status.kind === "ok" ? "ok" : "err"}`}>
          {status.msg}
        </p>
      )}
      <p className="lead-form__legal">
        By submitting, you agree to our <Link href="/terms/">Terms</Link> and <Link href="/privacy/">Privacy Policy</Link>.
      </p>
    </form>
  );
}
