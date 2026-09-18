import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/AuthForms";
import { currentUser } from "@/lib/session";
import { googleEnabled } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: true },
};

export default async function LoginPage() {
  if (await currentUser()) redirect("/");
  return (
    <div className="mx-auto max-w-sm px-4 py-14">
      <h1 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
        Welcome back
      </h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <LoginForm googleEnabled={googleEnabled} />
      </div>
    </div>
  );
}
