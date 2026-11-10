import { assertionSchema, type Assertion, type Source } from "../../domain/src/index.js";

export interface SourceAdapter {
  source: Source;
  fetchObservations(): Promise<unknown[]>;
}
export interface NormalizedObservation { assertion: Assertion; sourceOwnerId: string; }
export function normalizeObservation(input: unknown, source: Source): NormalizedObservation {
  if (!source.rightsApproved) throw new Error("Source rights not approved");
  const assertion = assertionSchema.parse(input);
  if (assertion.sourceId !== source.id) throw new Error("Source mismatch");
  return { assertion, sourceOwnerId: source.ownerId };
}
export function ingestionAllowed(source: Source, production: boolean): boolean {
  // U0 production gate: synthetic fixtures alone never authorize live ingestion.
  return !production && source.rightsApproved;
}
