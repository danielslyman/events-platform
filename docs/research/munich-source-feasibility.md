# U0 — Munich Event Source Feasibility Assessment

**Research date:** 2026-11-10  
**Scope:** Public-document research, not runtime/API integration, legal opinion, source sampling, or production authorization.  
**Decision:** **CONDITIONAL NO-GO for production ingestion and M1 launch claims**. Research and architecture design may proceed; production adapters must wait for verified source rights and measured coverage.

## Executive decision

The public evidence demonstrates multiple technical access paths, but does **not** validate three independent, authorized, sufficiently current Munich event sources. Eventsimple has an unusually clear commercial API-use permission, with material limits on copying and redistribution. Ticketmaster has German event coverage but contractual restrictions needing use-case-specific clearance. The city open-data dataset located is licensed for attribution reuse, yet is historical trade-fair data rather than a verified comprehensive upcoming-event feed. Organizer-scoped pretix integrations are feasible only with participating organizers.

No provider credentials were used; no API result counts, live sample completeness, duplicate rates, or cancellation propagation latencies were measured. Accordingly AE1–AE4 remain **unvalidated**, not failed against observed production measurements.

## Candidate evaluation

### Eventsimple

The public API offers city, category, date-range, and radius filters, JSON event records, RSS and iCal, with ISO 8601 time-zone-aware dates. Its terms expressly allow commercial API/feed use, require linked attribution, cap usage at one request/second, mandate at least 15-minute caching, and prohibit complete inventory copies and redistribution. A bounded, attributed consumer display could fit; **a durable shared canonical mirror and multiple independent publications may exceed the stated rights** without clarification. Test Munich-specific results and negotiate intended canonical storage/multi-publication use before committing a production adapter.

Sources: https://eventsimple.de/api ; https://eventsimple.de/nutzungsbedingungen

### Ticketmaster Discovery API and Feed

Discovery API supports event/venue search with developer keys, German-market availability, and default limits of 5,000 calls/day and 5 calls/second. Discovery Feed offers DE country files but draws from the same data family, so the two are **one source family** for AE1. Terms restrict reasonable-duration caching, monetization of API access, and products replicating Ticketmaster's core experience; takedowns requested by owners must be honored within 24 hours. **No permission for Events Platform's planned canonical multi-publication inventory is established by this research.** Obtain clarification and sample Munich coverage with authorized credentials.

Sources: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/ ; https://developer.ticketmaster.com/products-and-docs/apis/discovery-feed/ ; https://www.developer.ticketmaster.com/support/terms-of-use/

### Munich Open Data / Messe München

A Messe München event dataset is available as CSV under Datenlizenz Deutschland Namensnennung 2.0 and contains event names, dates, and organizer information. It is explicitly described as historical trade-fair events since 2018; the dataset metadata was updated in September 2026. A recent dataset update does **not** establish current upcoming events or five-category consumer coverage. Useful for licensed fixtures and data-shape research; insufficient as a validated M1 live source.

Source: https://opendata.muenchen.de/dataset/veranstaltungen-der-messe-muenchen/resource/b698829c-b051-4092-a276-9ba1afdc12f3

### Organizer partnerships via pretix

pretix exposes an event API with organizer/team-scoped permissions and support for event series/subevents. It is a potential ingestion path **only when an organizer grants appropriate access and publication rights**. No Munich partners were contacted or verified.

Sources: https://docs.pretix.eu/dev/api/fundamentals.html ; https://docs.pretix.eu/dev/api/resources/events.html

## Acceptance feasibility assessment

| Acceptance | Proposed target | Public-research result | Next proof |
|---|---|---|---|
| AE1 independent sources | >=3 independent, permitted sources and >=5 categories | **Not validated**; candidates exist, but none has measured Munich counts and fully cleared intended use | License/partner approval, authenticated queries, 30-day rolling coverage sample, distinct-owner count |
| AE2 completeness | >=95% usable location and unambiguous schedule | **Not measured**; candidate schemas support dates/venues but actual completeness unknown | Stratified sample of upcoming Munich occurrences; time-zone and ongoing-schedule audit |
| AE3 deduplication | >=95% correct identity decisions; false merges/misses separately | **Not measured**; no labeled cross-source corpus | Independently labeled duplicate and nonduplicate event/occurrence pairs, report precision/recall and error counts |
| AE4 cancellation | <=30 min after verified ingestion to all active publication surfaces | **Not measured**; no running pipeline | Controlled synthetic cancellation with end-to-end query timestamps; separately document source-detection delay |

AE5–AE9 are implementation/browser tests, not empirically testable through public-source research alone. Do not claim them validated here.

## Gating decisions and next actions

1. **Legal/contractual gate:** Confirm the exact intended use for each provider: retained canonical facts, permitted text/images, multiple independently branded publications, source linking, caches, and deletion/takedown. Obtain written permissions where standard terms are ambiguous or restrictive.
2. **Coverage gate:** Run permitted Munich queries for a defined upcoming window (recommend 30 days) and publish counts by independent owner, category, date, geolocation, and overlap. Do not count the same upstream owner twice.
3. **Quality gate:** Establish a reproducible sample, independently label event/occurrence matches, and measure both false merges and missed merges; separately audit schedule/location completeness.
4. **Freshness gate:** Define source-specific polling budgets and test internal cancellation propagation with synthetic fixtures. Do not confuse successful internal propagation with time-to-detect provider changes.
5. **Escalation:** If AE1's source count or AE2–AE4 targets cannot be achieved, seek explicit product approval before changing the 19 settled decisions or weakening the Product Contract.

## Feasibility verdict

- **Proceed:** source negotiation, licensed-fixture exploration, canonical-domain design, source-independent tests.
- **Hold:** production ingestion from unapproved sources; claims of live Munich coverage; publication of third-party event content beyond confirmed rights.
- **No-go pending evidence:** M1 release and U0 sign-off against AE1–AE4.
- **Not performed:** credentialed API calls, data downloads for bulk replication, source-owner outreach, runtime integration, CI/tests, legal review.

See `docs/research/source-rights-matrix.md` for source-by-source constraints and links.
