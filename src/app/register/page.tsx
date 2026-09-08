import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/AuthForms";
import { currentUser } from "@/lib/session";
import { googleEnabled } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Join the photography forum — ask questions, get structured critique on your work.",
  alternates: { canonical: "/register" },
};

export default async function RegisterPage() {
  if (await currentUser()) redirect("/");
  return (
    <div className="mx-auto max-w-sm px-4 py-14">
      <h1 className="mb-2 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
        Create your account
      </h1>
      <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Free, and you can post a critique request straight away.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <RegisterForm googleEnabled={googleEnabled} />
      </div>
    </div>
  );
}
