import { existsSync } from "node:fs";
import path from "node:path";
import { currentDate, currentReportMonth, previousMonth, readJson, rootDir, writeJson, type Entity, type MonthlyDiff } from "./lib.js";

function emptyDiff() {
  return { added: [] as string[], updated: [] as string[], statusChanged: [] as string[], removed: [] as string[] };
}

async function readSnapshot<T extends Entity>(month: string, name: string): Promise<T[] | null> {
  const snapshotPath = `data/snapshots/${month}/${name}.json`;
  if (!existsSync(path.join(rootDir, snapshotPath))) return null;
  return readJson<T[]>(snapshotPath);
}

function compareEntities<T extends Entity>(current: T[], previous: T[] | null) {
  const diff = emptyDiff();
  if (!previous) {
    diff.added = current.map((item) => item.id);
    return diff;
  }

  const previousById = new Map(previous.map((item) => [item.id, item]));
  const currentById = new Map(current.map((item) => [item.id, item]));

  for (const item of current) {
    const oldItem = previousById.get(item.id);
    if (!oldItem) {
      diff.added.push(item.id);
      continue;
    }
    if (oldItem.status !== item.status) diff.statusChanged.push(item.id);
    if (JSON.stringify(oldItem) !== JSON.stringify(item)) diff.updated.push(item.id);
  }

  for (const item of previous) {
    if (!currentById.has(item.id)) diff.removed.push(item.id);
  }

  return diff;
}

export async function buildMonthlyDiff(month = currentReportMonth()): Promise<MonthlyDiff> {
  const previous = previousMonth(month);
  const previousSnapshotPath = path.join(rootDir, `data/snapshots/${previous}`);
  const hasPreviousSnapshot = existsSync(previousSnapshotPath);
  const chips = await readJson<Entity[]>("data/chips.json");
  const vehicles = await readJson<Entity[]>("data/vehicles.json");
  const platforms = await readJson<Entity[]>("data/platforms.json");
  const otaUpdates = await readJson<Entity[]>("data/ota-updates.json");

  return {
    month,
    generatedAt: currentDate(),
    previousMonth: hasPreviousSnapshot ? previous : null,
    chips: compareEntities(chips, await readSnapshot(previous, "chips")),
    vehicles: compareEntities(vehicles, await readSnapshot(previous, "vehicles")),
    platforms: compareEntities(platforms, await readSnapshot(previous, "platforms")),
    otaUpdates: compareEntities(otaUpdates, await readSnapshot(previous, "ota-updates"))
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const month = currentReportMonth();
  const diff = await buildMonthlyDiff(month);
  await writeJson(`data/monthly-diffs/${month}.json`, diff);
  console.log(`Monthly diff written to data/monthly-diffs/${month}.json`);
}
