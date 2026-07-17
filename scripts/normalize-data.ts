import { readJson, writeJson } from "./lib.js";

type Identified = { id: string };

function sortById<T extends Identified>(items: T[]) {
  return [...items].sort((a, b) => a.id.localeCompare(b.id));
}

await writeJson("data/sources.json", sortById(await readJson<Identified[]>("data/sources.json")));
await writeJson("data/chips.json", sortById(await readJson<Identified[]>("data/chips.json")));
await writeJson("data/vehicles.json", sortById(await readJson<Identified[]>("data/vehicles.json")));
await writeJson("data/platforms.json", sortById(await readJson<Identified[]>("data/platforms.json")));
await writeJson("data/ota-updates.json", sortById(await readJson<Identified[]>("data/ota-updates.json")));

console.log("Data files normalized by stable id order.");
