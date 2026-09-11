"use client";

import { useState, useTransition } from "react";
import { replyToThreadAsAiAction } from "@/actions/simulation";

export type AiInspectorModalProps = {
  threadId: string;
  threadTitle: string;
  topic?: string | null;
  posts: {
    id: string;
    authorName: string;
    authorUsername: string;
    aiAgent?: string | null;
    isSimulated: boolean;
    createdAt: Date | string;
  }[];
};

export function AiInspectorModal({ threadId, threadTitle, topic, posts }: AiInspectorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleGenerateAiReply = () => {
    setStatusMsg("🤖 AI Discussion Agent selecting persona & model to reply...");
    startTransition(async () => {
      const res = await replyToThreadAsAiAction(threadId);
      if (res.success) {
        setStatusMsg("✅ AI Persona Reply generated! Refreshing page...");
        window.location.reload();
      } else {
        setStatusMsg(`❌ Error: ${("error" in res ? res.error : null) || "Failed to generate AI reply"}`);
      }
    });
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-purple-200 bg-purple-50/80 p-3.5 dark:border-purple-900/50 dark:bg-purple-950/40">
        <div className="flex items-center gap-2 text-xs text-purple-950 dark:text-purple-200">
          <span className="font-bold">🎓 University Demonstration Mode</span>
          <span className="hidden sm:inline">• Inspect AI Multi-Agent Pipeline & LLM Attribution</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateAiReply}
            disabled={isPending}
            className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-purple-500 disabled:opacity-50"
          >
            {isPending ? "⏳ Replying..." : "🤖 Request AI Persona Reply"}
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg border border-purple-300 bg-white px-3 py-1.5 text-xs font-semibold text-purple-900 hover:bg-purple-100 dark:border-purple-700 dark:bg-slate-900 dark:text-purple-200 dark:hover:bg-purple-900/40"
          >
            🔬 AI Pipeline Inspector
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="mb-4 rounded-lg bg-slate-900 p-2.5 text-xs font-mono text-purple-300">
          {statusMsg}
        </div>
      )}

      {/* Slide-out / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-sm p-4 sm:p-6">
          <div className="h-full w-full max-w-xl overflow-y-auto rounded-2xl border border-purple-500/30 bg-slate-900 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-300 ring-1 ring-purple-500/30">
                  AI Orchestration Inspector
                </span>
                <h2 className="mt-1 text-lg font-bold text-white">{threadTitle}</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6 text-xs">
              {/* Agent Pipeline Flowchart */}
              <div>
                <h3 className="mb-2 font-bold uppercase tracking-wider text-purple-300">
                  🧠 Multi-Agent Autonomous Pipeline Flow
                </h3>
                <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span>1. PersonaAgent</span>
                    <span className="text-slate-500">➔ Seeded simulated accounts</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <span>2. TopicDiscoveryAgent</span>
                    <span className="text-slate-500">➔ Generated question topic</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-400">
                    <span>3. ResearchAgent</span>
                    <span className="text-slate-500">➔ Web fact extraction & spec pricing</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <span>4. DiscussionAgent</span>
                    <span className="text-slate-500">➔ Multi-LLM model post generation</span>
                  </div>
                  <div className="flex items-center gap-2 text-rose-400">
                    <span>5. EngagementAgent</span>
                    <span className="text-slate-500">➔ Simulated upvote distribution</span>
                  </div>
                </div>
              </div>

              {/* Per-Post LLM Attribution */}
              <div>
                <h3 className="mb-2 font-bold uppercase tracking-wider text-purple-300">
                  🔀 Post Attribution & OpenRouter LLM Models
                </h3>
                <div className="space-y-3">
                  {posts.map((post, idx) => (
                    <div
                      key={post.id}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">
                          #{idx + 1} @{post.authorUsername} ({post.authorName})
                        </span>
                        <span className="rounded bg-purple-900/60 px-2 py-0.5 text-[10px] font-mono text-purple-300 ring-1 ring-purple-500/30">
                          {post.aiAgent || "Human Post"}
                        </span>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Simulated: {post.isSimulated ? "Yes (AI)" : "No (Human)"}</span>
                        <span>{new Date(post.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
