import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/session";

/**
 * Opening a notification: mark it read, then go where it points.
 *
 * Done as a plain link to this route rather than an onClick handler so that it
 * holds however the member opens it — a middle-click or "open in new tab"
 * still marks it read, which a client-side click handler would miss. Links to
 * it are rendered as `<a>`, not `<Link>`, because Link prefetches in the
 * background and a prefetch would mark notifications read that were only ever
 * scrolled past.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) redirect(`/login?next=/notifications`);

  const notification = await prisma.notification.findFirst({
    where: { id, userId: user.id },
    select: { id: true, href: true, read: true },
  });
  if (!notification) redirect("/notifications");

  if (!notification.read) {
    await prisma.notification.update({ where: { id: notification.id }, data: { read: true } });
    revalidatePath("/", "layout");
  }

  // `href` is written by the server, but it is still a stored value being fed
  // into a redirect — accept only same-site paths so it can never become an
  // open redirect.
  const target = notification.href;
  const safe = target.startsWith("/") && !target.startsWith("//") && !target.includes("\\");
  redirect(safe ? target : "/notifications");
}
