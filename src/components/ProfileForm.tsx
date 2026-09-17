"use client";

import { useActionState, useRef, useState } from "react";
import { updateProfileAction } from "@/actions/account";
import { idle } from "@/actions/types";
import { SubmitButton } from "@/components/SubmitButton";
import { FormError } from "@/components/FormError";
import { Avatar } from "@/components/Avatar";

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100";

export function ProfileForm({
  user,
}: {
  user: {
    username: string;
    image: string | null;
    name: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    instagram: string | null;
  };
}) {
  const [state, formAction] = useActionState(updateProfileAction, idle);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [remove, setRemove] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <span className="mb-1 block text-sm font-medium">Profile photo</span>
        <div className="flex items-center gap-4">
          <Avatar user={{ username: user.username, name: user.name, image: preview ?? user.image }} size={64} />
          <div className="min-w-0">
            <input
              ref={fileRef}
              id="avatar"
              name="avatar"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return setPreview(null);
                if (file.size > 15 * 1024 * 1024) {
                  setSizeError("Image is larger than 15 MB.");
                  e.target.value = "";
                  return setPreview(null);
                }
                setSizeError(null);
                setRemove(false);
                setPreview(URL.createObjectURL(file));
              }}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-slate-200 dark:text-slate-400 dark:file:bg-slate-800 dark:file:text-slate-200"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              JPEG, PNG or WebP up to 15 MB. Cropped to a square automatically.
            </p>
            {(user.image || preview) && (
              <button
                type="button"
                onClick={() => {
                  setRemove(true);
                  setPreview(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="mt-1 text-xs font-medium text-rose-600 hover:underline dark:text-rose-400"
              >
                Remove photo
              </button>
            )}
            {remove && (
              <p className="mt-1 text-xs text-slate-500">
                Photo will be removed when you save — your generated avatar comes back.
              </p>
            )}
            {sizeError && <p className="mt-1 text-xs text-rose-600">{sizeError}</p>}
          </div>
        </div>
        {remove && <input type="hidden" name="removeAvatar" value="1" />}
      </div>

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Display name</label>
          <input id="name" name="name" defaultValue={user.name ?? ""} maxLength={60} className={input} />
        </div>
        <div>
          <label htmlFor="bio" className="mb-1 block text-sm font-medium">Bio (up to 500 chars)</label>
          <textarea id="bio" name="bio" rows={3} defaultValue={user.bio ?? ""} maxLength={500} className={input} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-medium">Location</label>
            <input id="location" name="location" defaultValue={user.location ?? ""} className={input} />
          </div>
          <div>
            <label htmlFor="experienceLevel" className="mb-1 block text-sm font-medium">Experience Level</label>
            <select id="experienceLevel" name="experienceLevel" defaultValue={(user as any).experienceLevel ?? "INTERMEDIATE"} className={input}>
              <option value="BEGINNER">Beginner (0-2 years)</option>
              <option value="INTERMEDIATE">Intermediate (2-5 years)</option>
              <option value="PRO">Pro Photographer</option>
              <option value="STUDIO">Studio Owner / Commercial</option>
            </select>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="website" className="mb-1 block text-sm font-medium">Website</label>
            <input id="website" name="website" type="url" defaultValue={user.website ?? ""} placeholder="https://" className={input} />
          </div>
          <div>
            <label htmlFor="portfolioUrl" className="mb-1 block text-sm font-medium">Portfolio URL</label>
            <input id="portfolioUrl" name="portfolioUrl" type="url" defaultValue={(user as any).portfolioUrl ?? ""} placeholder="https://" className={input} />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="instagram" className="mb-1 block text-sm font-medium">Instagram Handle</label>
            <input id="instagram" name="instagram" defaultValue={user.instagram ?? ""} placeholder="yourhandle" className={input} />
          </div>
          <div>
            <label htmlFor="twitter" className="mb-1 block text-sm font-medium">Twitter / X Handle</label>
            <input id="twitter" name="twitter" defaultValue={(user as any).twitter ?? ""} placeholder="yourhandle" className={input} />
          </div>
        </div>
        <FormError error={state.error} message={state.message} />
        <SubmitButton pendingLabel="Saving…">Save profile</SubmitButton>
      </form>
  );
}
