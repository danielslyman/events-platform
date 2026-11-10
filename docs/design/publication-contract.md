# Publication selection and editorial isolation (unimplemented)

**Product authority:** Decisions 13–16, R11–R14 and R23. M1 implements selection only; invited publisher administration and full editorial tools are V1.

## Publication configuration

Each publication has a stable ID, domain/brand identity, active state, geography selectors, scene selectors, category filters, and editorial policy. Selection computes qualifying **canonical occurrence references**; the publication does not own copies of event/venue/organizer facts.

Selection logic: trusted and eligible occurrence AND matching geography AND matching configured scene/category policy. Explicit filters use documented AND/OR semantics. Parent scene includes descendant scene matches; an event in multiple scenes appears once.

## Example configurations

- `munich-general`: Munich geography, all eligible categories and scenes.
- `munich-techno`: Munich geography, Techno scene including descendants; may show the same event ID as `munich-general`.

A second deployed website is **not** required for M1; both configurations must pass tests against one inventory.

## Full V1 editorial boundary

An authorized editor can feature, exclude, reorder, and write publication-specific summaries or imagery **only when licensed**. They cannot alter start time, venue, cancellation, source authority, or canonical identity. Platform operator controls publication invitations and role assignment. Every edit is scoped to one publication and audited.

## Negative cases

- A Berlin-only occurrence is absent from Munich-only results.
- Same canonical occurrence selected twice through overlapping scenes is returned once.
- Cancellation or source takedown suppresses active listing even if a publisher featured it.
- Editor on publication A cannot alter publication B.
- An editorial summary never overwrites canonical source assertions.

## M1 acceptance

Two distinct publication configurations select overlapping event IDs from a shared canonical dataset with no factual duplication, and the Munich website uses the general configuration.
