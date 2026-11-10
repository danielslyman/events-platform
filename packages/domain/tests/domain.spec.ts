import { describe, it, expect } from "vitest";
import { assertAcyclicScenes, sceneDescendants, occurrenceSchema } from "../src/index.js";
describe("canonical domain", () => {
  const scenes = [{id:"electronic",parentIds:[]},{id:"techno",parentIds:["electronic"]},{id:"industrial",parentIds:["techno"]}];
  it("supports overlapping hierarchical scene selection", () => {
    assertAcyclicScenes(scenes);
    expect([...sceneDescendants(scenes,"electronic")]).toContain("industrial");
  });
  it("rejects scene cycles", () => expect(() => assertAcyclicScenes([{id:"a",parentIds:["b"]},{id:"b",parentIds:["a"]}])).toThrow());
  it("rejects an end preceding start", () => {
    expect(occurrenceSchema.safeParse({id:"o",eventId:"e",startsAt:"2026-11-20T20:00:00+01:00",endsAt:"2026-11-20T19:00:00+01:00",timeZone:"Europe/Berlin",status:"scheduled",venueId:"v"}).success).toBe(false);
  });
});
