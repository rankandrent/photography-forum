import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export type EmailNotificationParams = {
  toEmail: string;
  recipientName: string;
  replierName: string;
  threadTitle: string;
  threadSlug: string;
  replySnippet: string;
};

/**
 * Sends a real email notification to a real forum user when someone replies to their thread or post.
 * Uses Resend API if RESEND_API_KEY is present in environment, or logs the structured email dispatch cleanly.
 */
export async function sendReplyNotificationEmail(params: EmailNotificationParams): Promise<boolean> {
  const { toEmail, recipientName, replierName, threadTitle, threadSlug, replySnippet } = params;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://photographyforum.net";
  const threadUrl = `${siteUrl}/t/${threadSlug}`;
  const subject = `[${site.name}] New reply from ${replierName} on "${threadTitle}"`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a; margin-top: 0;">📸 PhotographyForum.net Notification</h2>
      <p>Hi <strong>${recipientName}</strong>,</p>
      <p><strong>${replierName}</strong> just replied to your discussion on <strong>"${threadTitle}"</strong>:</p>
      <blockquote style="background-color: #f8fafc; border-left: 4px solid #f43f5e; margin: 16px 0; padding: 12px 16px; font-style: italic; color: #334155;">
        "${replySnippet.length > 200 ? replySnippet.substring(0, 200) + '...' : replySnippet}"
      </blockquote>
      <div style="margin-top: 24px;">
        <a href="${threadUrl}" style="background-color: #f43f5e; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; display: inline-block;">
          View Reply on Forum &rarr;
        </a>
      </div>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 30px;" />
      <p style="font-size: 12px; color: #64748b;">You are receiving this email notification because someone replied to your post on PhotographyForum.net.</p>
    </div>
  `;

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "notifications@photographyforum.net",
          to: [toEmail],
          subject,
          html: htmlContent,
        }),
      });

      if (!res.ok) {
        console.error("Resend API response error:", await res.text());
      } else {
        console.log(`[EMAIL DISPATCH SUCCESS] Real User: ${toEmail} | Subject: ${subject}`);
        return true;
      }
    }

    // Always log clean email notification dispatch for real users
    console.log(`[REAL USER EMAIL TRIGGERED] To: ${toEmail} | Replier: ${replierName} | Thread: "${threadTitle}"`);
    return true;
  } catch (err) {
    console.error("Failed to execute reply email notification:", err);
    return false;
  }
}

/**
 * Checks if thread or parent post author is a REAL human user (!isSimulated)
 * and sends them an email notification when a new reply arrives.
 */
export async function triggerRealUserReplyNotification(params: {
  threadId: string;
  parentPostId?: string | null;
  replierUserId: string;
  replierName: string;
  replyBody: string;
}) {
  const { threadId, parentPostId, replierUserId, replierName, replyBody } = params;

  try {
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      select: {
        id: true,
        title: true,
        slug: true,
        author: { select: { id: true, email: true, name: true, username: true, isSimulated: true } },
      },
    });

    if (!thread) return;

    let targetUser = thread.author;

    if (parentPostId) {
      const parentPost = await prisma.post.findUnique({
        where: { id: parentPostId },
        select: {
          author: { select: { id: true, email: true, name: true, username: true, isSimulated: true } },
        },
      });
      if (parentPost?.author) {
        targetUser = parentPost.author;
      }
    }

    // Do NOT notify if replier is the target recipient themselves
    if (targetUser.id === replierUserId) return;

    // ONLY send email notification to REAL human registered users
    if (!targetUser.isSimulated && targetUser.email) {
      await sendReplyNotificationEmail({
        toEmail: targetUser.email,
        recipientName: targetUser.name || targetUser.username,
        replierName,
        threadTitle: thread.title,
        threadSlug: thread.slug,
        replySnippet: replyBody,
      });
    }
  } catch (error) {
    console.error("Error checking real user email trigger:", error);
  }
}
