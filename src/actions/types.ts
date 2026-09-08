export type ActionState = { ok: boolean; error?: string; message?: string };

export const idle: ActionState = { ok: false };

export function fail(error: string): ActionState {
  return { ok: false, error };
}
