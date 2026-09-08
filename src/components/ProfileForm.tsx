"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/actions/account";
import { idle } from "@/actions/types";
import { SubmitButton } from "@/components/SubmitButton";
import { FormError } from "@/components/FormError";

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100";

export function ProfileForm({
  user,
}: {
  user: {
    name: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    instagram: string | null;
  };
}) {
  const [state, formAction] = useActionState(updateProfileAction, idle);

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">Display name</label>
        <input id="name" name="name" defaultValue={user.name ?? ""} maxLength={60} className={input} />
      </div>
      <div>
        <label htmlFor="bio" className="mb-1 block text-sm font-medium">Bio</label>
        <textarea id="bio" name="bio" rows={3} defaultValue={user.bio ?? ""} maxLength={400} className={input} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className="mb-1 block text-sm font-medium">Location</label>
          <input id="location" name="location" defaultValue={user.location ?? ""} className={input} />
        </div>
        <div>
          <label htmlFor="instagram" className="mb-1 block text-sm font-medium">Instagram handle</label>
          <input id="instagram" name="instagram" defaultValue={user.instagram ?? ""} placeholder="yourhandle" className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="website" className="mb-1 block text-sm font-medium">Portfolio URL</label>
        <input id="website" name="website" type="url" defaultValue={user.website ?? ""} placeholder="https://" className={input} />
      </div>
      <FormError error={state.error} message={state.message} />
      <SubmitButton pendingLabel="Saving…">Save profile</SubmitButton>
    </form>
  );
}
