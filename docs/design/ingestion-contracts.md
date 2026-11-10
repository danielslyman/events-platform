# Ingestion and trust contracts (unimplemented)

**Scope:** R3–R7, R15, AE3/AE4/AE8. No production source adapter authorized until U0 rights clearance.

## Adapter boundary

A source adapter produces a normalized **observation**, not a published event. Its envelope contains `sourceId`, `ownerId`, `sourceRecordId`, `observedAt`, `fetchedAt`, `rightsPolicyId`, `sourceUrl`, `assertions`, and `rawRetentionAllowed`. Each assertion records value, provenance path, confidence evidence, and verified/unverified classification. Never silently fill missing fields.

Input transport and rights policy remain separate: Ticketmaster API and feed are one source owner. Enforce source-specific rate limiting, cache minimums, attribution, deletion and takedown.

## Processing stages

1. **Acquire:** Check source approval, rate/cache budget, and authorized access; stop on rights revocation.
2. **Validate:** Parse schema, dates/timezones, venue and source IDs. Reject invalid claims; quarantine malformed rows with non-sensitive diagnostics.
3. **Normalize:** Standardize comparable fields without erasing source text or precision.
4. **Match:** First exact native IDs; then high-confidence venue/time/title/organizer evidence. A title similarity alone never merges events.
5. **Reconcile:** Append source assertions; decide field-level authority by verified organizer, trusted source, recency, and conflict materiality.
6. **Review:** Low-confidence and consequential conflicts require human review; no automatic verified claim.
7. **Publish eligibility:** Accepted canonical state passes to publication selection, which independently filters geography/scenes and occurrence status.
8. **Withdraw:** Apply source-specific takedown and retention requirements to canonical and cached material.

## Deduplication policy

Use conservative candidate generation and reversible merges. Distinguish: same event across two sources; multiple occurrences of one event; separate performances with similar titles; duplicate syndicated feeds; renamed or rescheduled occurrences. Audit false merges and missed merges independently on a human-labeled reference set. Do not present 95% aggregate accuracy without denominators and per-error measures.

## Freshness policy

Schedule source polling according to event proximity, observed change rate, reliability, provider limits, and cancellation risk. Critical verified updates invalidate affected publication query caches. AE4 clock starts at *successful verified ingestion*, not provider-side change. Source outages retain last known valid records with stale indication; they do not silently assert current availability.

## Synthetic acceptance cases

- Identical source record ingested twice -> same canonical event and occurrence, no extra assertion unless observation changed.
- Two sources disagree on start time -> both assertions retained, conflict queued, unverified value not promoted.
- One organizer's two shows at 20:00 and 23:00 -> separate occurrences.
- Cancellation from authorized source -> affected occurrence inactive across all publication selections.
- Revoked source -> no further acquisition and required data deletion/withdrawal tracked.
- 429/timeout -> backoff and stale status; discovery remains available.

## Deferred decisions

Confidence scoring coefficients, queue technology, ORM, and review UI are implementation decisions after U0/U1; do not hard-code arbitrary confidence percentages in the Product Contract.
