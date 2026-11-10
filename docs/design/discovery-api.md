# Discovery API contract (proposal, unimplemented)

**Scope:** R1, R8–R10, R11–R16. HTTP shapes are illustrative contracts for U6, not deployed endpoints.

## Read-only endpoints

| Endpoint | Inputs | Output |
|---|---|---|
| `GET /api/publications/{id}/events` | `q`, `from`, `to`, `category`, `scene`, `bbox`, `cursor`, `limit` | Paginated canonical occurrence summaries |
| `GET /api/publications/{id}/events/{eventId}` | Event ID | Canonical event details, upcoming occurrences, provenance/links |
| `GET /api/publications/{id}/calendar` | Month/range, optional filters | Date-bucketed eligible occurrences |
| `GET /api/publications/{id}/map` | Bounds, optional filters | Geo-located eligible occurrences or clusters |
| `GET /api/publications/{id}/facets` | Active filters | Available categories, scenes, dates with counts |

All endpoints are publication-scoped. Search, map and calendar use the same canonical eligibility logic so cancelled occurrences cannot leak through one view. Unknown price, time, or location is explicit, never fabricated.

## Example response envelope

```json
{
  "publicationId": "munich-general",
  "items": [
    {
      "eventId": "evt-demo-1",
      "occurrenceId": "occ-demo-1",
      "title": "Synthetic Munich concert",
      "startsAt": "2026-11-20T19:00:00+01:00",
      "timeZone": "Europe/Berlin",
      "status": "scheduled",
      "venue": {"name": "Synthetic Venue", "lat": 48.13, "lon": 11.57},
      "price": {"amount": null, "currency": "EUR", "status": "unknown"},
      "source": {"name": "Synthetic Source", "url": "https://example.org/event"},
      "verification": "accepted"
    }
  ],
  "nextCursor": null
}
```

## Error and security rules

- Validate geographic bounds, time ranges, page size, cursor and publication IDs.
- A publication cannot query unpublished or quarantined records via public APIs.
- Invalid cursor -> clear 400 error; unknown publication -> 404; unavailable dependency -> controlled 503 with no secrets.
- Stable ordering and cursor semantics avoid duplicates or missing records during pagination.
- Venue coordinates are omitted when unknown; map view never fabricates geocodes.
- Query responses expose only rights-cleared display fields and required attribution.
- Anonymous saving is client-local; no user account endpoint in M1.

## Contract tests

Search/calendar/map yield consistent active occurrence IDs for equivalent filters; pagination deterministic; cancellation disappears from active results; overlap scenes deduplicate; source attribution retained; publication isolation enforced.
