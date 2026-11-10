# Munich discovery UX specification (M1, unimplemented)

## Core pages

**Discover:** City title, search input, date range, category and scene filters, list/map/calendar view switcher, results count, saved access. Default useful anonymous experience without onboarding. **Event detail:** title, verified date/time and timezone, venue/address/map context, description, category/scenes, price or unknown label, source attribution, outbound ticket/info link, save action, cancellation/rescheduling notice.

**Saved:** Device-local collection of canonical event IDs; reload/restart persistence; explicit empty state and notice that clearing browser data removes saves.

## Responsive and accessible interaction

- Mobile: filter drawer, list-first default, reachable view switcher, readable event cards and sticky-but-nonblocking controls.
- Desktop: list/map side-by-side optional, calendar as alternate view; URL query reflects shareable filter state (but local saves remain device-local).
- Keyboard: skip link, labeled search, filter groups, logical tab order, visible focus, map-independent result access, no keyboard traps.
- Screen reader: result-count announcements, clear event status, semantic dates, descriptive save/unsave buttons, map alternative.
- Motion: respect reduced-motion preference; no essential information encoded solely by color or map pin.

## Critical states

| State | User-facing behavior |
|---|---|
| No results | Explain active filters, offer clear-filters action |
| No upcoming events | Honest empty state; never populate synthetic events in production |
| Source stale | Show last-confirmed context where allowed; do not imply current availability |
| Event cancelled | Visible cancelled status; not listed as active upcoming |
| Event rescheduled | New schedule clearly identified and sourced |
| Location unknown | Detail still accessible, omit map pin |
| Price unknown | “Price not available” instead of zero/free |
| Map fails | List search remains fully usable |
| Offline/reload | Saved IDs persist locally, detail refresh may be unavailable |
| Source attribution | Clearly linked to provider in listing/detail per source terms |

## User journeys and acceptance

1. Anonymous visitor opens Munich discovery, searches a category, filters next weekend, opens event detail, follows source link.
2. Visitor switches list to map and calendar without inconsistent event status or duplicated occurrences.
3. Visitor saves an event, restarts browser, and finds it under Saved; removes it and confirms persistence.
4. Keyboard-only visitor completes search -> details -> save -> saved collection.
5. Visitor encounters cancellation, stale listing, or missing price and receives accurate status rather than fabricated certainty.

## Explicit deferrals

No login, social invitations, organizer portal, booking checkout, personalized recommendations, or full editorial administration in M1.
