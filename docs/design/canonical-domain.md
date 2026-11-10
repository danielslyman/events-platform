# Canonical event domain — design contract (unimplemented)

**Authority:** Events Platform unified plan R2–R7, R11–R14; decisions 13–19. **Status:** design proposal, not validated code.

## Entities and ownership

| Entity | Identity | Key attributes and invariants |
|---|---|---|
| Event | stable opaque `eventId` | Title and normalized identity, organizer reference, type; one event may have many occurrences |
| Occurrence | stable opaque `occurrenceId` | Event FK, start/end with IANA timezone, status (scheduled/rescheduled/cancelled/expired), venue or valid online/ongoing semantics |
| Venue | `venueId` | Name, address, WGS84 point, accessibility data when sourced; do not merge solely by name |
| Organizer | `organizerId` | Claimed/verified state separate from displayed name |
| Source | `sourceId` and independent `ownerId` | Rights, attribution, access mode, rate/cache/retention/takedown policy |
| Source assertion | `assertionId` | Source identifier, source-native event/occurrence ID, observed time, raw field provenance, confidence, permitted retention |
| Geographic node | `geoId` | Country/region/city/neighborhood parent tree; venue may belong to multiple valid geographic selection areas |
| Scene | `sceneId` | Parent-child directed acyclic graph, cross-city, multiple scene memberships per event |
| Publication | `publicationId` | Independent domain/branding, geographic/scene/category selection, presentation overlay; canonical facts never copied |

Canonical event identity and occurrence identity are distinct. Recurrence exceptions (cancellation, venue/time changes) affect a specific occurrence. For open-ended exhibitions, store an explicit ongoing schedule, not invented event timestamps. Persist local time zone and UTC instants where a time is known. Unknown times stay unknown.

## Data integrity rules

- Event-to-occurrence is 1:N; event-to-scene is M:N; venue-to-geography is through explicit location references.
- Source assertions are immutable observations subject to provider retention limits; a new observation supersedes rather than silently edits previous claims.
- Canonical facts carry authority status and lineage to assertions. Editorial overlays cannot mutate them.
- Scenes may have multiple parents, but cycles are invalid. Query descendants once and deduplicate event IDs.
- Canonical merge operations must preserve original source IDs, merge audit trail, and reversibility for false positives.
- Removal or takedown must propagate to caches and publications consistent with provider rights.
- Multi-publication queries use the same canonical IDs; no cross-publication event duplication.
- Publishing requires accepted trust state, current occurrence eligibility, and publication match.

## Minimal state transitions

`observed -> validated -> accepted | needs_review | rejected`; `needs_review -> accepted | rejected`. Occurrence status `scheduled -> rescheduled | cancelled | expired`. Restoring a cancelled occurrence requires a newly verified assertion and audit entry.

## Decision boundary

PostgreSQL/PostGIS is a provisional KTD; do not lock the schema or select an ORM until U1. Event title, description, images, and pricing are source-sensitive and may require field-level rights. U0 licensing remains a production ingestion gate.

## Required proofs

Two occurrences for one event; DST transition; overlapping scene ancestry without duplicates; distinct performances never falsely merged; source withdrawal; canonical ID shared by two publications; unauthorized editorial factual override rejected.
