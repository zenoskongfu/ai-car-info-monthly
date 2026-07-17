import { readFile, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { readJson, rootDir } from "./lib.js";

type ValidateFn = ((data: unknown) => boolean) & { errors?: unknown };
type AjvLike = {
  compile(schema: unknown): ValidateFn;
};

const require = createRequire(import.meta.url);
const AjvCtor = require("ajv") as new (options: { allErrors: boolean; strict: boolean }) => AjvLike;
const addFormats = require("ajv-formats") as (ajv: AjvLike) => void;

type Source = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  sourceType: string;
  reliability: string;
};

type Chip = {
  id: string;
  status: string;
  compute: { precision: string };
  sourceIds: string[];
};

type Vehicle = {
  id: string;
  modelYear: number;
  status: string;
  chipIds: string[];
  totalCompute: { calculationMethod: string; value: number | null };
  sourceIds: string[];
};

type Platform = {
  id: string;
  status: string;
  chipIds: string[];
  sourceIds: string[];
};

type OtaUpdate = {
  id: string;
  status: string;
  vehicleIds: string[];
  sourceIds: string[];
  lastUpdated: string;
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

async function validateSchema(ajv: AjvLike, schemaPath: string, dataPath: string) {
  const schema = JSON.parse(await readFile(path.join(rootDir, schemaPath), "utf8"));
  const data = JSON.parse(await readFile(path.join(rootDir, dataPath), "utf8"));
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    throw new Error(`${dataPath} failed schema validation:\n${JSON.stringify(validate.errors, null, 2)}`);
  }
}

function assertUnique(items: { id: string }[], label: string) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) throw new Error(`${label} has duplicated id: ${item.id}`);
    seen.add(item.id);
  }
}

function assertKnownSources(entityLabel: string, entityId: string, sourceIds: string[], sourceIdsSet: Set<string>) {
  if (sourceIds.length === 0) throw new Error(`${entityLabel} ${entityId} must have at least one source`);
  for (const sourceId of sourceIds) {
    if (!sourceIdsSet.has(sourceId)) throw new Error(`${entityLabel} ${entityId} references missing source ${sourceId}`);
  }
}

function assertMassProductionSource(entityLabel: string, entityId: string, status: string, sourceIds: string[], sources: Map<string, Source>) {
  if (status !== "mass_production") return;
  const hasReliableSource = sourceIds.some((sourceId) => {
    const source = sources.get(sourceId);
    return source && (source.sourceType === "official" || source.sourceType === "regulatory" || source.reliability === "high");
  });
  if (!hasReliableSource) {
    throw new Error(`${entityLabel} ${entityId} is mass_production but lacks official/regulatory/high reliability source`);
  }
}

function assertCurrentVehicleSourceFreshness(vehicle: Vehicle, sources: Map<string, Source>) {
  if (vehicle.modelYear < 2026) return;
  const vehicleSources = vehicle.sourceIds.map((sourceId) => sources.get(sourceId)).filter((source): source is Source => Boolean(source));
  const hasCurrentOfficialSource = vehicleSources.some((source) => source.sourceType === "official" && source.publishedAt >= "2026-01-01");
  if (!hasCurrentOfficialSource) {
    throw new Error(`vehicle ${vehicle.id} is a 2026 current vehicle but lacks a current official source`);
  }

  const staleCurrentVehicleSource = vehicleSources.find((source) => {
    const sourceText = `${source.id} ${source.title} ${source.url}`;
    return /2024|2025款|g92025|suet|news\/company_news\/5355/.test(sourceText);
  });
  if (staleCurrentVehicleSource) {
    throw new Error(`vehicle ${vehicle.id} uses stale current-model source ${staleCurrentVehicleSource.id}`);
  }
}

function assertDates(value: unknown, pointer = "$") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertDates(item, `${pointer}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      if ((key.endsWith("Date") || key.endsWith("At") || key === "lastUpdated") && nested !== null) {
        if (typeof nested !== "string" || !datePattern.test(nested)) {
          throw new Error(`${pointer}.${key} must use YYYY-MM-DD`);
        }
      }
      assertDates(nested, `${pointer}.${key}`);
    }
  }
}

async function assertReportsHaveCutoff() {
  let files: string[] = [];
  try {
    files = await readdir(path.join(rootDir, "docs/monthly"));
  } catch {
    return;
  }
  for (const file of files.filter((name) => name.endsWith(".md"))) {
    const content = await readFile(path.join(rootDir, "docs/monthly", file), "utf8");
    if (!content.includes("数据截止时间：")) {
      throw new Error(`docs/monthly/${file} is missing 数据截止时间`);
    }
    if (!content.includes("## 十、传闻和待确认信息")) {
      throw new Error(`docs/monthly/${file} is missing rumor/uncertain section`);
    }
  }
}

export async function validateAll() {
  const ajv = new AjvCtor({ allErrors: true, strict: false });
  addFormats(ajv);

  await validateSchema(ajv, "schemas/source.schema.json", "data/sources.json");
  await validateSchema(ajv, "schemas/chip.schema.json", "data/chips.json");
  await validateSchema(ajv, "schemas/vehicle.schema.json", "data/vehicles.json");
  await validateSchema(ajv, "schemas/platform.schema.json", "data/platforms.json");

  const sources = await readJson<Source[]>("data/sources.json");
  const chips = await readJson<Chip[]>("data/chips.json");
  const vehicles = await readJson<Vehicle[]>("data/vehicles.json");
  const platforms = await readJson<Platform[]>("data/platforms.json");
  const otaUpdates = await readJson<OtaUpdate[]>("data/ota-updates.json");

  assertUnique(sources, "sources");
  assertUnique(chips, "chips");
  assertUnique(vehicles, "vehicles");
  assertUnique(platforms, "platforms");
  assertUnique(otaUpdates, "ota-updates");

  const sourceUrls = new Set<string>();
  for (const source of sources) {
    if (sourceUrls.has(source.url)) throw new Error(`sources has duplicated url: ${source.url}`);
    sourceUrls.add(source.url);
  }

  const sourceIds = new Set(sources.map((source) => source.id));
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  const chipIds = new Set(chips.map((chip) => chip.id));
  const vehicleIds = new Set(vehicles.map((vehicle) => vehicle.id));

  for (const chip of chips) {
    assertKnownSources("chip", chip.id, chip.sourceIds, sourceIds);
    assertMassProductionSource("chip", chip.id, chip.status, chip.sourceIds, sourceMap);
    if (!chip.compute.precision) throw new Error(`chip ${chip.id} compute precision is required`);
  }

  for (const vehicle of vehicles) {
    assertKnownSources("vehicle", vehicle.id, vehicle.sourceIds, sourceIds);
    assertMassProductionSource("vehicle", vehicle.id, vehicle.status, vehicle.sourceIds, sourceMap);
    assertCurrentVehicleSourceFreshness(vehicle, sourceMap);
    for (const chipId of vehicle.chipIds) {
      if (!chipIds.has(chipId)) throw new Error(`vehicle ${vehicle.id} references missing chip ${chipId}`);
    }
    if (vehicle.totalCompute.value !== null && vehicle.totalCompute.calculationMethod === "not_available") {
      throw new Error(`vehicle ${vehicle.id} has total compute value without a calculation method/source`);
    }
  }

  for (const platform of platforms) {
    assertKnownSources("platform", platform.id, platform.sourceIds, sourceIds);
    assertMassProductionSource("platform", platform.id, platform.status, platform.sourceIds, sourceMap);
    for (const chipId of platform.chipIds) {
      if (!chipIds.has(chipId)) throw new Error(`platform ${platform.id} references missing chip ${chipId}`);
    }
  }

  for (const update of otaUpdates) {
    assertKnownSources("ota-update", update.id, update.sourceIds, sourceIds);
    for (const vehicleId of update.vehicleIds) {
      if (!vehicleIds.has(vehicleId)) throw new Error(`ota-update ${update.id} references missing vehicle ${vehicleId}`);
    }
  }

  assertDates({ sources, chips, vehicles, platforms, otaUpdates });
  await assertReportsHaveCutoff();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  validateAll()
    .then(() => {
      console.log("Data validation passed.");
    })
    .catch((error: unknown) => {
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    });
}
