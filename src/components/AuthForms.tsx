"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, registerAction, googleSignInAction } from "@/actions/account";
import { idle } from "@/actions/types";
import { SubmitButton } from "@/components/SubmitButton";
import { FormError } from "@/components/FormError";

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100";

function GoogleButton() {
  return (
    <form action={googleSignInAction}>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.2-4.8 3.2-8.1z" />
          <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.7l-3.6-2.7c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.2-1.9-6-4.4H2.3v2.8A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M6 14.3a6.6 6.6 0 0 1 0-4.2V7.3H2.3a11 11 0 0 0 0 9.8L6 14.3z" />
          <path fill="#EA4335" d="M12 5.5c1.6 0 3 .5 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.3L6 10.1c.8-2.5 3.2-4.6 6-4.6z" />
        </svg>
        Continue with Google
      </button>
    </form>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-400">
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      or
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export function LoginForm({ googleEnabled }: { googleEnabled: boolean }) {
  const [state, formAction] = useActionState(loginAction, idle);
  return (
    <div className="space-y-4">
      {googleEnabled && (
        <>
          <GoogleButton />
          <Divider />
        </>
      )}
      <form action={formAction} className="space-y-3">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={input} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className={input} />
        </div>
        <FormError error={state.error} />
        <SubmitButton className="w-full" pendingLabel="Signing in…">Sign in</SubmitButton>
      </form>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        New here?{" "}
        <Link href="/register" className="font-medium text-brand-600 hover:underline">Create an account</Link>
      </p>
    </div>
  );
}

export function RegisterForm({ googleEnabled }: { googleEnabled: boolean }) {
  const [state, formAction] = useActionState(registerAction, idle);
  return (
    <div className="space-y-4">
      {googleEnabled && (
        <>
          <GoogleButton />
          <Divider />
        </>
      )}
      <form action={formAction} className="space-y-3">
        <div>
          <label htmlFor="username" className="mb-1.5 block text-sm font-medium">Username</label>
          <input
            id="username"
            name="username"
            required
            minLength={3}
            maxLength={24}
            pattern="[a-zA-Z0-9_\-]+"
            autoComplete="username"
            className={input}
          />
          <p className="mt-1 text-xs text-slate-400">This is your public handle at /u/username.</p>
        </div>
        <div>
          <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium">Email</label>
          <input id="reg-email" name="email" type="email" autoComplete="email" required className={input} />
        </div>
        <div>
          <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium">Password</label>
          <input
            id="reg-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={input}
          />
          <p className="mt-1 text-xs text-slate-400">At least 8 characters.</p>
        </div>
        <FormError error={state.error} />
        <SubmitButton className="w-full" pendingLabel="Creating…">Create account</SubmitButton>
      </form>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Already a member?{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
