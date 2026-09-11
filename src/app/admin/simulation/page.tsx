"use client";

import { useState, useEffect, useTransition } from "react";
import {
  runFastDemoAction,
  resetSimulationAction,
  getSimulationLogsAction,
  getSimulationStatsAction,
  getSimulationSettingsAction,
  updateSimulationSettingsAction,
} from "@/actions/simulation";

export default function AdminSimulationPage() {
  const [isPending, startTransition] = useTransition();
  const [customTopic, setCustomTopic] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [createdThreadLink, setCreatedThreadLink] = useState<{ title: string; slug: string } | null>(null);

  const [stats, setStats] = useState({
    threadsCount: 0,
    postsCount: 0,
    simulatedUsersCount: 0,
    votesCount: 0,
  });

  const [logs, setLogs] = useState<
    { id: string; agent: string; action: string; details: string; status: string; createdAt: Date }[]
  >([]);

  const [settings, setSettings] = useState({
    openRouterApiKey: "",
    modelName: "anthropic/claude-3.5-sonnet",
    modelPool: "anthropic/claude-3.5-sonnet,openai/gpt-4o-mini,meta-llama/llama-3.3-70b-instruct,deepseek/deepseek-chat,google/gemini-2.0-flash-001,mistralai/mistral-small-24b-instruct-2501,qwen/qwen-2.5-72b-instruct",
    maxNestingDepth: 3,
    minDelayMs: 2000,
    maxDelayMs: 5000,
    upvoteRangeMax: 20,
  });

  const loadData = async () => {
    const [statsRes, logsRes, settingsRes] = await Promise.all([
      getSimulationStatsAction(),
      getSimulationLogsAction(),
      getSimulationSettingsAction(),
    ]);

    if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
    if (logsRes.success && logsRes.logs) setLogs(logsRes.logs as any);
    if (settingsRes.success && settingsRes.settings) {
      setSettings({
        openRouterApiKey: settingsRes.settings.openRouterApiKey || "",
        modelName: settingsRes.settings.modelName || "anthropic/claude-3.5-sonnet",
        modelPool: settingsRes.settings.modelPool || "anthropic/claude-3.5-sonnet,openai/gpt-4o-mini,meta-llama/llama-3.3-70b-instruct,deepseek/deepseek-chat,google/gemini-2.0-flash-001,mistralai/mistral-small-24b-instruct-2501,qwen/qwen-2.5-72b-instruct",
        maxNestingDepth: settingsRes.settings.maxNestingDepth || 3,
        minDelayMs: settingsRes.settings.minDelayMs || 2000,
        maxDelayMs: settingsRes.settings.maxDelayMs || 5000,
        upvoteRangeMax: settingsRes.settings.upvoteRangeMax || 20,
      });
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRunFastDemo = () => {
    setStatusMessage("🚀 Running Fast Demo Simulation Cycle... Generating topic, persona replies, nested discussions, and votes.");
    setCreatedThreadLink(null);

    startTransition(async () => {
      const res = await runFastDemoAction(customTopic.trim() || undefined);
      if (res.success && "threadSlug" in res) {
        const threadSlug = (res as any).threadSlug;
        const threadTitle = (res as any).threadTitle;
        const postsCount = (res as any).postsCount;
        setStatusMessage(`✅ Simulation Complete! Thread "${threadTitle}" created with ${postsCount} posts.`);
        setCreatedThreadLink({ title: threadTitle || "View Thread", slug: threadSlug });
        setCustomTopic("");
      } else {
        setStatusMessage(`❌ Error: ${(res as any).error || "Failed to run simulation."}`);
      }
      loadData();
    });
  };

  const handleReset = () => {
    if (!confirm("Are you sure you want to delete all simulated threads, posts, users, and votes? Genuine admin data will remain untouched.")) return;

    setStatusMessage("🧹 Resetting simulation data...");
    startTransition(async () => {
      const res = await resetSimulationAction();
      if (res.success) {
        setStatusMessage("✅ Simulation data reset cleanly.");
        setCreatedThreadLink(null);
      } else {
        setStatusMessage(`❌ Reset error: ${(res as any).error || "Failed to reset"}`);
      }
      loadData();
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateSimulationSettingsAction(settings);
      if (res.success) {
        setStatusMessage("✅ Simulation settings saved successfully.");
      } else {
        setStatusMessage(`❌ Failed to save settings: ${res.error}`);
      }
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header Banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-900 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300 ring-1 ring-purple-500/30">
              🎓 University Demonstration Project
            </div>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">AI Autonomous Forum Simulation</h1>
            <p className="mt-1 text-sm text-slate-300">
              Autonomous multi-agent topic discovery, persona generation, research, nested conversation trees & simulated engagement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRunFastDemo}
              disabled={isPending}
              className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-500 disabled:opacity-50"
            >
              {isPending ? "⏳ Executing..." : "🚀 Run Fast Demo Mode"}
            </button>
            <button
              onClick={handleReset}
              disabled={isPending}
              className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-900/60 disabled:opacity-50"
            >
              🧹 Reset Simulation
            </button>
          </div>
        </div>

        {/* Custom Topic Input */}
        <div className="mt-6 border-t border-purple-800/40 pt-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-purple-200">
            Custom Topic Prompt (Optional)
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. What is the best mirrorless camera for travel under $1000?"
              className="w-full rounded-lg border border-purple-700/50 bg-slate-950/80 px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {statusMessage && (
          <div className="mt-4 rounded-lg bg-slate-950/90 p-3 text-xs font-mono text-purple-200 border border-purple-500/30">
            {statusMessage}
            {createdThreadLink && (
              <div className="mt-2">
                👉{" "}
                <a
                  href={`/t/${createdThreadLink.slug}`}
                  target="_blank"
                  className="font-bold text-amber-300 underline hover:text-amber-200"
                >
                  View Created Simulation Thread: {createdThreadLink.title}
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Simulated Threads</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.threadsCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Simulated Posts</p>
          <p className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.postsCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Simulated Accounts</p>
          <p className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.simulatedUsersCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Simulated Votes</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.votesCount}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Live Logs (2 cols) */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">📡 AI Agent Live Activity Logs</h2>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Auto-updating
              </span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2">
              {logs.length === 0 ? (
                <p className="text-sm text-slate-500 italic py-6 text-center">No simulation logs recorded yet. Click "Run Fast Demo Mode" above!</p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-600 dark:text-purple-400">{log.agent}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{log.action}</p>
                    <p className="text-slate-500 dark:text-slate-400">{log.details}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Settings Panel (1 col) */}
        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">⚙️ OpenRouter & LLM Rotation Setup</h2>
            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300">
                  OpenRouter API Key (Optional Override)
                </label>
                <input
                  type="password"
                  value={settings.openRouterApiKey}
                  onChange={(e) => setSettings({ ...settings, openRouterApiKey: e.target.value })}
                  placeholder="sk-or-v1-..."
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 font-mono"
                />
                <p className="mt-1 text-[10px] text-slate-400">
                  Overrides OPENROUTER_API_KEY environment variable.
                </p>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300">
                  Multi-LLM Model Rotation Pool (Comma Separated)
                </label>
                <textarea
                  rows={4}
                  value={settings.modelPool}
                  onChange={(e) => setSettings({ ...settings, modelPool: e.target.value })}
                  placeholder="anthropic/claude-3.5-sonnet, openai/gpt-4o-mini, deepseek/deepseek-chat..."
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 font-mono text-[11px]"
                />
                <p className="mt-1 text-[10px] text-slate-400">
                  Each simulated user reply rotates to a different LLM model for natural variety!
                </p>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300">Default Model</label>
                <input
                  type="text"
                  value={settings.modelName}
                  onChange={(e) => setSettings({ ...settings, modelName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300">Max Nesting Depth</label>
                <input
                  type="number"
                  value={settings.maxNestingDepth}
                  onChange={(e) => setSettings({ ...settings, maxNestingDepth: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300">Max Upvotes Per Post</label>
                <input
                  type="number"
                  value={settings.upvoteRangeMax}
                  onChange={(e) => setSettings({ ...settings, upvoteRangeMax: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Save Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
