"use client";

import { useTransition } from "react";
import { resolveReportAction, setUserRoleAction } from "@/actions/moderation";

export function ResolveButtons({ reportId }: { reportId: string }) {
  const [pending, startTransition] = useTransition();
  const cls = "rounded-lg border px-2.5 py-1 text-xs font-medium disabled:opacity-50";
  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={pending}
        className={`${cls} border-emerald-300 text-emerald-700 dark:text-emerald-400`}
        onClick={() => startTransition(() => resolveReportAction(reportId, "RESOLVED").then(() => undefined))}
      >
        Resolve
      </button>
      <button
        type="button"
        disabled={pending}
        className={`${cls} border-slate-300 text-slate-600 dark:text-slate-400`}
        onClick={() => startTransition(() => resolveReportAction(reportId, "DISMISSED").then(() => undefined))}
      >
        Dismiss
      </button>
    </div>
  );
}

export function RoleSelect({ userId, role }: { userId: string; role: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={role}
      disabled={pending}
      aria-label="Member role"
      onChange={(e) =>
        startTransition(() =>
          setUserRoleAction(userId, e.target.value as "USER" | "MOD" | "ADMIN").then(() => undefined),
        )
      }
      className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-950"
    >
      <option value="USER">User</option>
      <option value="MOD">Moderator</option>
      <option value="ADMIN">Admin</option>
    </select>
  );
}
