import { describe, it, expect } from "vitest";
import { matchAssertion, evaluateAssertion } from "../src/reconcile.js";
import { normalizeObservation, ingestionAllowed } from "../src/index.js";
const source = {id:"synthetic-a",ownerId:"synthetic-owner",attribution:"Synthetic",rightsApproved:true,retentionAllowed:true};
const base = {id:"assert-1",sourceId:"synthetic-a",nativeId:"event-1",eventId:null,occurrenceId:null,title:"Synthetic Concert",startsAt:"2026-11-20T20:00:00+01:00",venueId:"venue-1",observedAt:"2026-11-10T12:00:00+01:00",sourceUrl:"https://example.org/event",cancelled:false};
describe("synthetic ingestion", () => {
  it("rejects unapproved source and production ingestion", () => {
    expect(() => normalizeObservation(base,{...source,rightsApproved:false})).toThrow();
    expect(ingestionAllowed(source,true)).toBe(false);
  });
  it("matches exact native ID idempotently", () => {
    expect(matchAssertion(base,[{eventId:"evt-1",occurrenceId:"occ-1",assertion:base}])).toEqual({kind:"exact",eventId:"evt-1",occurrenceId:"occ-1"});
  });
  it("routes cross-source duplicate candidates to review", () => {
    expect(matchAssertion({...base,id:"a2",sourceId:"synthetic-b",nativeId:"other"},[{eventId:"evt-1",occurrenceId:"occ-1",assertion:base}]).kind).toBe("review");
  });
  it("routes conflicting start times to review", () => {
    expect(evaluateAssertion({...base,startsAt:"2026-11-20T21:00:00+01:00"},[base]).state).toBe("needs_review");
  });
});
