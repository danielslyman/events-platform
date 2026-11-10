# U0 — Munich Event Source Rights Matrix

Research date: 2026-11-10. Public-document review only. This matrix is not legal advice, API credential verification, or a measured Munich inventory audit.

| Candidate / independent owner | Access | Commercial display / redistribution | Attribution and storage constraints | Munich coverage / freshness | Decision |
|---|---|---|---|---|---|
| Eventsimple / Kursimple GmbH | Public JSON, iCal, RSS, no key | Expressly allows commercial API/feed use; **forbids complete inventory copies and redistribution** | “Daten: Eventsimple” linked to eventsimple.de wherever shown; <=1 request/sec; cache >=15 minutes; docs mention list responses may cache for one hour | City and geospatial filters documented; **Munich count and freshness unmeasured** | **Conditional candidate** for bounded, attributed, non-mirroring use |
| Ticketmaster Discovery API / Ticketmaster | Developer API key; Germany coverage documented | API terms prohibit Ticketmaster-experience replication and restrict commercial API monetization; explicit rights for planned multi-publication use **not established** | Reasonable-duration caching only; takedown within 24h upon owner request; respect terms, rate limits (default 5,000/day, 5/sec), privacy disclosure | German coverage documented; **Munich count unmeasured** | **Hold** pending written use-case/rights clarification and credentialed sample |
| Ticketmaster Discovery Feed / Ticketmaster | Developer key; DE country JSON/CSV feed | Same underlying Ticketmaster data family; **not an independent second source** | Same rights review; country-level bulk feed does not imply unlimited copying | Germany feed documented; **Munich count unmeasured** | **Hold**, possible alternate transport after rights review |
| Messe München historical events / Messe München GmbH via City Open Data | Public CSV and CKAN metadata | Dataset marked Datenlizenz Deutschland Namensnennung 2.0 (DL-DE BY 2.0); reuse subject to license conditions | Attribute dataset provider and license; verify source/version before use | Dataset of trade-fair events since 2018; **historical, not established as upcoming diverse Munich feed** | **Permitted research/fixture candidate**, not proven launch coverage |
| pretix / participating organizers | Documented REST API; organizer-scoped authorized tokens | No blanket right to harvest arbitrary organizers' listings; require organizer authorization and agreement | Per-organizer permissions and credentials; terms of each organizer agreement govern reuse | Depends on actual Munich organizer partners; none verified | **Partnership candidate**, not a public bulk source |
| OSM / OpenStreetMap contributors | Public geodata | ODbL reuse with attribution/share-alike obligations where applicable | Credit OSM contributors; comply with ODbL and map tile provider terms | Venue/geography enrichment, **not an event inventory** | **Supporting geodata only**, never count toward AE1 |

## Source evidence

- Eventsimple API, limits and license: https://eventsimple.de/api
- Eventsimple terms (2026-10-25): https://eventsimple.de/nutzungsbedingungen
- Ticketmaster Discovery API: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
- Ticketmaster Discovery Feed: https://developer.ticketmaster.com/products-and-docs/apis/discovery-feed/
- Ticketmaster API terms: https://www.developer.ticketmaster.com/support/terms-of-use/
- Ticketmaster developer FAQ: https://developer.ticketmaster.com/support/faq/
- Munich dataset: https://opendata.muenchen.de/dataset/veranstaltungen-der-messe-muenchen/resource/b698829c-b051-4092-a276-9ba1afdc12f3
- pretix permissions: https://docs.pretix.eu/dev/api/fundamentals.html
- pretix event API: https://docs.pretix.eu/dev/api/resources/events.html
- OSM license: https://www.openstreetmap.org/copyright

## Rights decision rules

1. Do not infer redistribution rights from an accessible endpoint or an event's public web page.
2. Preserve attribution, source identity, observation time, and per-source permitted retention.
3. Do not ingest full copies of Eventsimple's corpus or redistribute it as a dataset. Its permitted use must be reconciled with the product's canonical inventory model before production.
4. Do not count Ticketmaster API and Feed separately for AE1.
5. Keep source-specific takedown and withdrawal paths; review downstream copies and caches on revocation.
6. For organizers using pretix, obtain scoped access and explicit publishing authorization.
7. Re-check current terms before any production use; this is a dated preliminary assessment.
