import type { Assertion } from "../../domain/src/index.js";

export interface Candidate { eventId: string; occurrenceId: string; assertion: Assertion; }
export type Match = { kind: "exact"; eventId: string; occurrenceId: string } |
  { kind: "review"; reason: string } | { kind: "new" };
const key = (a: Assertion) => a.sourceId + ":" + a.nativeId;

export function matchAssertion(incoming: Assertion, known: Candidate[]): Match {
  const exact = known.find(c => key(c.assertion) === key(incoming));
  if (exact) return { kind: "exact", eventId: exact.eventId, occurrenceId: exact.occurrenceId };
  // Similar titles alone must never auto-merge. Cross-source candidates require review.
  const plausible = known.some(c => {
    const a = c.assertion;
    return a.venueId !== null && a.venueId === incoming.venueId &&
      a.startsAt !== null && a.startsAt === incoming.startsAt &&
      a.title.trim().toLocaleLowerCase() === incoming.title.trim().toLocaleLowerCase();
  });
  return plausible ? { kind: "review", reason: "Possible cross-source duplicate" } : { kind: "new" };
}
export type ReviewDecision = { state: "accepted" | "needs_review" | "rejected"; reason: string };
export function evaluateAssertion(assertion: Assertion, conflicts: Assertion[]): ReviewDecision {
  if (conflicts.some(a => a.startsAt !== assertion.startsAt || a.cancelled !== assertion.cancelled))
    return { state: "needs_review", reason: "Consequential source conflict" };
  return { state: "accepted", reason: "No detected consequential conflict" };
}
