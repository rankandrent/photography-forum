"use server";

import { prisma } from "@/lib/prisma";
import { runFastDemo, resetSimulation } from "@/lib/simulation/engine";

export async function runFastDemoAction(customTopic?: string) {
  try {
    const result = await runFastDemo(customTopic);
    return result;
  } catch (error) {
    console.error("Fast demo action error:", error);
    return { success: false, error: String(error) };
  }
}

export async function resetSimulationAction() {
  try {
    const result = await resetSimulation();
    return result;
  } catch (error) {
    console.error("Reset simulation error:", error);
    return { success: false, error: String(error) };
  }
}

export async function getSimulationLogsAction() {
  try {
    const logs = await prisma.simulationLog.findMany({
      take: 30,
      orderBy: { createdAt: "desc" },
    });
    return { success: true, logs };
  } catch (error) {
    return { success: false, logs: [], error: String(error) };
  }
}

export async function getSimulationStatsAction() {
  try {
    const [threadsCount, postsCount, simulatedUsersCount, votesCount] = await Promise.all([
      prisma.thread.count({ where: { isSimulated: true } }),
      prisma.post.count({ where: { isSimulated: true } }),
      prisma.user.count({ where: { isSimulated: true } }),
      prisma.vote.count({ where: { isSimulated: true } }),
    ]);

    return {
      success: true,
      stats: {
        threadsCount,
        postsCount,
        simulatedUsersCount,
        votesCount,
      },
    };
  } catch (error) {
    return {
      success: false,
      stats: { threadsCount: 0, postsCount: 0, simulatedUsersCount: 0, votesCount: 0 },
      error: String(error),
    };
  }
}

export async function getSimulationSettingsAction() {
  try {
    let settings = await prisma.simulationSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) {
      settings = await prisma.simulationSettings.create({
        data: {
          id: "default",
          enabled: true,
          fastDemoMode: false,
          modelName: process.env.OPENROUTER_MODEL || "anthropic/claude-opus-5",
          maxNestingDepth: 3,
          minDelayMs: 2000,
          maxDelayMs: 5000,
          upvoteRangeMax: 20,
        },
      });
    }
    return { success: true, settings };
  } catch (error) {
    return { success: false, settings: null, error: String(error) };
  }
}

export async function updateSimulationSettingsAction(data: {
  modelName?: string;
  maxNestingDepth?: number;
  minDelayMs?: number;
  maxDelayMs?: number;
  upvoteRangeMax?: number;
  enabled?: boolean;
}) {
  try {
    const settings = await prisma.simulationSettings.upsert({
      where: { id: "default" },
      update: data,
      create: {
        id: "default",
        ...data,
      },
    });
    return { success: true, settings };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
