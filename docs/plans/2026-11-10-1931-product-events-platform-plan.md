---
artifact_contract: ce-unified-plan/v1
artifact_readiness: requirements-only
product_contract_source: ce-brainstorm
execution: code
created_at: 2026-11-10
topic: events-platform
---

# Events Platform — Unified Plan

## Goal Capsule

- **Objective:** People exploring Munich can reliably discover and save real events and ongoing experiences, while operators maintain one trustworthy event inventory capable of powering independently branded city- and scene-focused publications.
- **Product authority:** This document records the approved Events Platform product decisions and M1/V1 boundaries. GitHub repository `danielslyman/events-platform` is the sole project repository. Prior implementation designs and unrelated projects are not authoritative.
- **Means:** A shared canonical event inventory with publication-specific selection and presentation.
- **Open blockers:** None preventing planning. Quantitative launch thresholds below are proposed targets requiring feasibility validation; see Outstanding Questions.

## Product Contract

### Summary

Events Platform combines consumer event discovery with a shared, scalable event intelligence and publishing foundation. Munich is the first launch market. Future independently branded apps and websites can select events by nested geography and overlapping scenes without copying canonical records. Consumer discovery comes first; open machine-readable interoperability is a longer-term direction.

### Problem Frame

City event information is fragmented across venues, organizers, feeds, and ticketing platforms. Visitors struggle to find relevant, current experiences, while separate specialist publications repeatedly collect and correct the same underlying information. Event discovery needs trustworthy shared facts without erasing local editorial identity.

### Actors

- **A1 Visitor:** Discovers and saves events without registration in M1.
- **A2 Platform operator:** Maintains sources, canonical records, trust and review policies, taxonomy, and publication governance.
- **A3 Publisher/editor:** Curates assigned publication content without altering canonical facts (full V1).
- **A4 Organizer:** Submits, claims, and corrects events with verification (full V1).
- **A5 Registered participant:** Synchronizes preferences and plans, coordinates, and books where supported (full V1).

### Key Decisions

All nineteen decisions were explicitly chosen by the user from alternatives during ce-brainstorm; the entries below index the governing requirements rather than restating them.

1. **Hybrid product vision** — consumer discovery first, open ecosystem later. Governs R1, R24. (session-settled: user-directed — chosen over discovery-only or open-protocol-first: consumer utility precedes ecosystem expansion)
2. **Universal city-explorer audience** — residents and visitors alike. Governs R1. (session-settled: user-directed — chosen over a single audience segment: discovery adapts to context)
3. **Events plus ongoing experiences** — not a generic place directory. Governs R2. (session-settled: user-directed — chosen over scheduled-only or all city places: include time-spanning experiences)
4. **Hybrid discovery** — deliberate exploration and recommendations. Governs R8, R18. (session-settled: user-directed — chosen over search-only or AI-first: both exploration modes matter)
5. **Hybrid sourcing** — aggregation and organizer contributions. Governs R3, R20. (session-settled: user-directed — chosen over a single source model: breadth plus direct corrections)
6. **Complete experience platform** — full V1 includes planning and supported transactions. Governs R21, R22. (session-settled: user-directed — chosen over discovery-only: participation is part of the product)
7. **One launch city** — focused validation. Governs R1. (session-settled: user-directed — chosen over broad launch: validate one market before expanding)
8. **Munich launch** — first market. Governs R1. (session-settled: user-directed — chosen over other cities: Munich is the initial proving ground)
9. **Progressive personalization** — useful before onboarding. Governs R18. (session-settled: user-directed — chosen over explicit-only or behavior-only: preferences improve gradually)
10. **Progressive identity** — anonymous first, account when needed. Governs R10, R19. (session-settled: user-directed — chosen over account-first or portable identity-first: avoid registration friction)
11. **Usable Munich discovery M1** — not merely an ingestion engine. Governs R1, R8. (session-settled: user-directed — chosen over data-only or full booking M1: prove real consumer value)
12. **Local-first saving** — device persistence without accounts. Governs R10. (session-settled: user-directed — chosen over mandatory accounts or share-link collections: immediate saving)
13. **Independent apps sharing canonical data** — publication independence. Governs R11, R12. (session-settled: user-directed — chosen over a single app with multiple views: distinct brands and products)
14. **Automatic discovery plus editorial curation** — independent presentation. Governs R13. (session-settled: user-directed — chosen over fully automatic or fully manual: combine scale and curation)
15. **Hierarchical overlapping scenes** — cross-city, multi-scene classification. Governs R14. (session-settled: user-directed — chosen over flat tags or full communities: expressive shared taxonomy)
16. **First-party and invited publishers** — scoped management. Governs R23. (session-settled: user-directed — chosen over first-party-only or open self-service: controlled partner participation)
17. **Verified authority with provenance** — governed factual corrections. Governs R5, R6. (session-settled: user-directed — chosen over source-only or organizer-only authority: trust and conflict resolution)
18. **Risk-based publication and review** — selective human oversight. Governs R7. (session-settled: user-directed — chosen over automatic-only or universal manual approval: scalable quality control)
19. **Adaptive freshness** — refresh by urgency and risk. Governs R4. (session-settled: user-directed — chosen over fixed-only or universal near-real-time polling: proportionate freshness)

### Requirements

**M1 — Munich inventory and trust**

- R1. Visitors can discover real Munich events through a public website without an account; the shared platform must remain capable of supporting additional cities.
- R2. Inventory includes scheduled events, recurring activities, and ongoing experiences, excluding generic place-only directory entries.
- R3. Multiple independent external sources contribute listings with retained source attribution and ingestion history.
- R4. Updates prioritize event proximity, source reliability, and change risk; expired and cancelled occurrences do not appear as upcoming recommendations.
- R5. Canonical records preserve provenance and distinguish verified information from unverified claims.
- R6. Material conflicts in dates, locations, cancellations, and other consequential facts are resolved by explicit authority rules or human review before being represented as verified.
- R7. Trusted validated submissions may publish automatically; suspicious, conflicting, or low-confidence submissions receive risk-based review.
- R8. Visitors can search and explore real listings through functional filters, categories, map, calendar, and event-detail views.
- R9. Event details communicate available schedule, location, description, pricing, and original booking or information links without fabricating unavailable fields.
- R10. Visitors can save and remove events without registration; saved items persist across page reload and browser restart on the same device.
- R11. M1's Munich website selects from the shared canonical inventory rather than owning a duplicate event database.
- R12. The platform distinguishes canonical event facts from publication-specific selection and presentation, supporting multiple independently branded websites and apps in the long term.
- R13. Publication rules automatically select matching inventory while allowing authorized editorial featuring, exclusion, ordering, and enrichment without modifying canonical facts; M1 must prove the selection boundary, with full editorial tooling deferred.
- R14. Geography supports nested locations, while hierarchical, overlapping scenes can span cities and events can belong to multiple scenes.
- R15. A source failure does not take down discovery or automatically discard previously valid canonical records.
- R16. Core discovery flows are usable on mobile and accessible by keyboard.

**Full V1 — experiences and publishing**

- R17. Users can plan experiences with collections, itineraries, reminders, and calendar interoperability.
- R18. Discovery improves through optional, transparent, editable preferences and meaningful interactions while remaining useful before personalization.
- R19. Accounts are introduced when needed for synchronization, collaboration, or transactions, preserving prior anonymous progress.
- R20. Organizers can submit, claim, and correct their listings subject to verification and permissions.
- R21. Users can coordinate attendance and plans with others, including invitations and shared decisions.
- R22. Where providers support it, users can reserve, buy tickets, and manage bookings through integrated flows.
- R23. Platform operators can invite publishers with permissions limited to assigned publications; editorial edits do not override canonical event facts.

**Long-term direction**

- R24. The platform should be able to participate in an open machine-readable event ecosystem; implementing federation or a new protocol is not required for M1 or full consumer V1.

### Key Flows

- **F1 — Source to inventory:** A2 authorizes a source; listings are ingested, normalized, attributed, deduplicated, validated, and either accepted or reviewed. Covers R3–R7.
- **F2 — Munich discovery:** A1 opens the public site, explores by search/map/calendar/filter, and views details and external booking links. Covers R1, R2, R8, R9, R16.
- **F3 — Anonymous saving:** A1 saves an event, returns after restarting the browser, sees it retained, and can remove it. Covers R10.
- **F4 — Update and correction:** A source changes an event or reports a cancellation; the platform evaluates authority, updates the canonical record when justified, and affected publications reflect the corrected facts. Covers R4–R7, R11–R13.
- **F5 — Independent publication:** A2 configures a publication's geographic and scene selection; qualifying shared events appear without duplication. Full V1 editors may curate their own publication. Covers R11–R14, R23.

### Acceptance Examples and Measurement

The following are **proposed M1 acceptance targets**, not empirically validated commitments. Planning must assess data-source feasibility and confirm achievable thresholds before treating them as launch gates.

- **AE1 — Real coverage (R1–R3):** Given authorized live Munich sources, when ingestion completes, then listings from at least **3 independent sources** and at least **5 distinct event/experience categories** are discoverable.
- **AE2 — Schedule/location completeness (R2, R9):** Given a representative sample of published upcoming occurrences, at least **95%** have a usable location and a valid schedule or an explicitly documented ongoing schedule.
- **AE3 — Deduplication (R3, R11):** Given a representative manually reviewed sample of listings, at least **95%** have no duplicate canonical event representation. Sampling method and denominator are to be specified in planning.
- **AE4 — Cancellation propagation (R4, R6, R11):** Given a verified cancellation successfully ingested, affected upcoming recommendations no longer show the occurrence as active within **30 minutes**; this measures post-ingestion propagation, not source detection latency.
- **AE5 — Local saving (R10):** Given an anonymous visitor saving an event, after reload and browser restart on the same device the saved item remains and can be removed, assuming local data has not been cleared.
- **AE6 — Source isolation (R15):** Given one unavailable source, discovery continues using previously valid records and other available sources, with freshness appropriately indicated.
- **AE7 — Shared record (R11–R14):** Given an event matching multiple scene/geography publication rules, the same canonical event can be selected by more than one publication without creating duplicate event facts.
- **AE8 — Trust (R5–R7):** Given conflicting start times from two sources, the platform retains provenance and does not silently present the lower-confidence claim as verified.
- **AE9 — Accessibility (R16):** A keyboard-only visitor can navigate search results, filters, event details, and saving; mobile layouts do not block these core tasks.

### Scope Boundaries

- **M1 includes:** Munich consumer discovery, multi-source real data, canonical normalization, deduplication, provenance, risk-based review, adaptive freshness, publication selection boundary, scene/geography classification, and anonymous local saving.
- **M1 defers:** account synchronization, recommendation personalization beyond useful anonymous discovery, organizer portals, invited publisher administration, advanced editorial tooling, collaborative planning, and integrated transactions.
- **Full V1 includes:** progressive identity and personalization, organizer participation, publisher permissions and curation, social planning, calendar interoperability, and provider-supported booking/ticketing.
- **Beyond V1:** open federation/protocol ecosystem and open self-service publisher marketplace are not current delivery requirements.
- **Non-goal:** generic restaurants, shops, landmarks, and other place-only listings unrelated to an event or ongoing experience.

### Assumptions and Risks

- Access to lawful, usable Munich event data from multiple independent sources is **not yet validated**; source licensing, attribution, permitted caching, and update limits require research.
- No numerical inventory volume, duplicate rate, or update SLA is yet proven feasible. The acceptance figures above are targets for feasibility testing, not guarantees.
- Source availability may constrain pricing, availability, cancellations, and ticketing information.
- Publication-level editorial overrides must never silently alter shared factual claims.
- A single logical canonical inventory does not prescribe one physical database instance forever; scaling and isolation mechanisms belong to implementation planning.
- Geographic hierarchy and scene taxonomy are independent facets, not a single rigid tree.

### Outstanding Questions

**Deferred to Planning**
- Which lawful sources and integration methods can satisfy AE1, and what attribution/retention obligations apply?
- What sampling protocol, reference set, and monitoring process make AE2–AE4 measurable?
- What achievable refresh and propagation service levels do providers permit?
- Which minimum publication-selection behavior best proves R11–R14 in M1?
- Which accessibility and operational checks demonstrate R15–R16?
- What delivery sequence minimizes risk while maintaining a working consumer milestone?

**Resolve Before Planning**
- None. If source feasibility invalidates AE1–AE4, return to product scope for explicit target adjustment rather than silently weakening requirements.
