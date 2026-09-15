"use client";

import { useEffect, useRef } from "react";
import { markSeenAction } from "@/actions/notifications";

/**
 * Clears the header badge once the member has opened their notifications.
 *
 * It runs after the list is on screen rather than during the server render:
 * a render can't revalidate the layout, and the badge lives in the layout. The
 * ref keeps it to one call even though the action's revalidation re-renders
 * the page around it.
 */
export function MarkNotificationsSeen({ hasUnseen }: { hasUnseen: boolean }) {
  const done = useRef(false);

  useEffect(() => {
    if (!hasUnseen || done.current) return;
    done.current = true;
    void markSeenAction();
  }, [hasUnseen]);

  return null;
}
