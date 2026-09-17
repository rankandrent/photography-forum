import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us & Support — PhotographyForum.net",
  description:
    "Get in touch with the PhotographyForum.net moderation team for inquiries, feedback, or account help.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Have a question about your account, feedback on forum features, or a moderation inquiry? We're here to help.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-100">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Jane Doe"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="How can we help?"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-500"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Direct Email Contact</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              For administrative or press inquiries:
            </p>
            <p className="mt-2 font-mono text-sm font-medium text-sky-600 dark:text-sky-400">
              support@photographyforum.net
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Response Time</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Our moderation team reviews support inquiries Monday through Friday. You will typically receive a response within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Us & Support",
          url: absoluteUrl("/contact"),
        }}
      />
    </div>
  );
}
