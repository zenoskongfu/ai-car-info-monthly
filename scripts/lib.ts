import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const rootDir = process.cwd();

export type Entity = {
  id: string;
  name?: string;
  brand?: string;
  model?: string;
  status?: string;
  sourceIds?: string[];
  lastUpdated?: string;
  notes?: string;
};

export type MonthlyDiff = {
  month: string;
  generatedAt: string;
  previousMonth: string | null;
  chips: { added: string[]; updated: string[]; statusChanged: string[]; removed: string[] };
  vehicles: { added: string[]; updated: string[]; statusChanged: string[]; removed: string[] };
  platforms: { added: string[]; updated: string[]; statusChanged: string[]; removed: string[] };
  otaUpdates: { added: string[]; updated: string[]; statusChanged: string[]; removed: string[] };
};

export async function readJson<T>(relativePath: string): Promise<T> {
  const raw = await readFile(path.join(rootDir, relativePath), "utf8");
  return JSON.parse(raw) as T;
}

export async function writeJson(relativePath: string, value: unknown): Promise<void> {
  const absolutePath = path.join(rootDir, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, `${JSON.stringify(value, null, 2)}\n`);
}

export async function writeText(relativePath: string, value: string): Promise<void> {
  const absolutePath = path.join(rootDir, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, value);
}

export function currentReportMonth(): string {
  if (process.env.REPORT_MONTH) return process.env.REPORT_MONTH;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit"
  });
  return formatter.format(new Date());
}

export function currentDate(): string {
  if (process.env.REPORT_DATE) return process.env.REPORT_DATE;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(new Date());
}

export function previousMonth(month: string): string {
  const [year, monthNumber] = month.split("-").map(Number);
  const date = new Date(Date.UTC(year, monthNumber - 2, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function monthTitle(month: string): string {
  const [year, monthNumber] = month.split("-");
  return `${year} 年 ${monthNumber} 月`;
}

export function displayName(entity: Entity): string {
  if (entity.name) return entity.name;
  if (entity.brand && entity.model) return `${entity.brand}${entity.model}`;
  return entity.id;
}

export function sourceLabel(sourceId: string, sourceMap: Map<string, { title: string; publisher: string; url: string }>): string {
  const source = sourceMap.get(sourceId);
  if (!source) return sourceId;
  return `[${source.publisher}：《${source.title}》](${source.url})`;
}

export async function listMonthlyReports(): Promise<string[]> {
  try {
    const entries = await readdir(path.join(rootDir, "docs/monthly"), { withFileTypes: true });
    const months = entries.flatMap((entry) => {
      if (entry.isDirectory() && /^\d{4}-\d{2}$/.test(entry.name)) return [entry.name];
      if (entry.isFile() && /^\d{4}-\d{2}\.md$/.test(entry.name)) return [entry.name.replace(".md", "")];
      return [];
    });
    return Array.from(new Set(months)).sort().reverse();
  } catch {
    return [];
  }
}
