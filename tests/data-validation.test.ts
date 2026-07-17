import { describe, expect, it } from "vitest";
import { validateAll } from "../scripts/validate-data.js";

describe("data validation", () => {
  it("passes schema and cross-file checks", async () => {
    await expect(validateAll()).resolves.toBeUndefined();
  });
});
