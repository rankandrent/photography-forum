"use client";

import { useTransition } from "react";
import { toggleGearAction } from "@/actions/account";

export function GearToggle({ gearId, owned }: { gearId: string; owned: boolean }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleGearAction(gearId).then(() => undefined))}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${
        owned
          ? "bg-emerald-600 text-white hover:bg-emerald-700"
          : "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      {owned ? "✓ In your kit" : "Add to my kit"}
    </button>
  );
}
