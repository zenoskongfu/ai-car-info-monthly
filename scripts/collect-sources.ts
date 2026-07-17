import { currentDate, currentReportMonth, readJson } from "./lib.js";

type Source = { id: string; title: string; publisher: string; url: string; reliability: string };

const sources = await readJson<Source[]>("data/sources.json");

console.log(`Source collection checkpoint for ${currentReportMonth()} (${currentDate()})`);
console.log(`Existing curated sources: ${sources.length}`);
console.log("Automated web search is intentionally not writing facts directly.");
console.log("Configure SEARCH_API_KEY/LLM_API_KEY and add a reviewed collector before enabling unattended source ingestion.");
