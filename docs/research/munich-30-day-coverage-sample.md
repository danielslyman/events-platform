# U0 — Munich 30-day coverage sampling attempt

**Assessment date:** 2026-11-10  
**Window:** 2026-11-10 through 2026-12-09 inclusive (30 calendar days).  
**Result:** **BLOCKED / NO MEASURED SAMPLE**. No live event rows were obtained. No coverage, quality, or deduplication metric can be inferred from this attempt.

## Authorized starting point

Eventsimple publicly documents a no-key, commercially usable read API with required linked attribution, maximum 1 request per second, minimum 15-minute cache, and a prohibition on complete copies or redistribution of its inventory. A *bounded city/time query for internal coverage evaluation* is materially narrower than a corpus mirror. This assessment does not authorize persisting or republishing full event data in Events Platform.

- API and endpoint schema: https://eventsimple.de/api
- Binding terms (version 2026-10-25): https://eventsimple.de/nutzungsbedingungen
- Provider: Kursimple GmbH; independent source-family count = **one**, not three.

## Reproducible bounded probe

```http
GET https://eventsimple.de/api/events?from=2026-11-10&to=2026-12-09&city=M%C3%BCnchen&limit=2000
```

Expected response fields from published API documentation: `count`, `total`, `truncated`, `events`. When executed in a network-enabled workspace, record response status, request time, source terms version, `total`, `truncated`, per-category counts, missing location/time fields, and any sample anomalies. Avoid committing provider event descriptions, images, or a complete inventory; store aggregate metrics and a small permitted audit sample only. Respect request and caching limits.

## Execution observations

1. Public API documentation and terms were retrieved through web search and inspected. The documentation shows Munich as a supported city value in a sample record, **not proof of current coverage**.
2. A direct web retrieval of the filtered endpoint failed with a tool access error. This does not demonstrate a provider outage.
3. A separate HTTPS request from the available command environment failed DNS resolution for `eventsimple.de`. This is an **environment network restriction**, not an observed API status code.
4. No authenticated Ticketmaster query, pretix organizer partnership, or Munich open-data event download was performed.
5. No event records were fetched; there is no measured 30-day inventory count, category distribution, or coverage comparison.

## Measurement ledger

| Measurement | Observed | Status |
|---|---|---|
| Eventsimple Munich 30-day total | — | Not measured |
| Distinct event categories | — | Not measured |
| Valid schedule + location share | — | Not measured |
| Independent permitted source owners | 0 fully coverage-validated; 1 documented bounded API candidate | Insufficient for AE1 |
| Cross-source duplicate pairs | — | Not measured |
| False merge / missed merge rates | — | Not measured |
| Verified cancellation propagation | — | Not measured |

## Required next action

Run the bounded query in a network-enabled workspace, document aggregate evidence, and confirm that the contemplated multi-publication canonical storage complies with provider terms before any production adapter. Obtain independent rights-cleared Munich sources until AE1's three-owner threshold is testable. For each candidate, sample the same 30-day window, preserving owner independence and data rights. Do not mark U0 passed until rights and measured AE1–AE4 feasibility are evidenced.

**Decision:** U0 remains **conditional no-go** for production ingestion and M1 launch claims. Research artifacts are not runtime verification.
