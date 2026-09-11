import "dotenv/config";
/**
 * Runs the content pipeline from the command line — the same code path the
 * daily cron uses, so this is how you test a change before it runs unattended.
 *
 *   npm run content:run          # respects the daily cap
 *   npm run content:run -- 1     # just one post
 *
 * Costs real money: each post runs Claude Opus 5 with web search.
 */
import { runPipeline, RUN_BATCH } from "../src/lib/content/pipeline.js";

const limit = Number(process.argv[2]) || RUN_BATCH;

const result = await runPipeline(limit);

if (result.skipped) console.log(`Skipped: ${result.skipped}`);
for (const p of result.published) console.log(`  published  ${p.keyword}  ->  /t/${p.slug}`);
for (const f of result.failed) console.log(`  FAILED     ${f.keyword}  ->  ${f.error}`);
console.log(
  `\n${result.published.length} published, ${result.failed.length} failed, ${result.attempted} attempted.`,
);
process.exit(result.failed.length > 0 ? 1 : 0);
