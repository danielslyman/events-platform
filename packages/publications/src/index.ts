import { sceneDescendants, type Event, type Occurrence, type Venue, type Scene, type Publication } from "../../domain/src/index.js";

export interface Inventory { events: Event[]; occurrences: Occurrence[]; venues: Venue[]; scenes: Scene[]; }
export function selectOccurrences(publication: Publication, inventory: Inventory): Occurrence[] {
  const events = new Map(inventory.events.map(e => [e.id, e]));
  const venues = new Map(inventory.venues.map(v => [v.id, v]));
  const eligibleScenes = new Set(publication.sceneIds.flatMap(s => [...sceneDescendants(inventory.scenes, s)]));
  const selected = new Map<string, Occurrence>();
  for (const occurrence of inventory.occurrences) {
    const event = events.get(occurrence.eventId);
    if (!event || event.trust !== "accepted" || occurrence.status === "cancelled" || occurrence.status === "expired") continue;
    const venue = occurrence.venueId ? venues.get(occurrence.venueId) : undefined;
    if (publication.cityIds.length && (!venue || !publication.cityIds.includes(venue.cityId))) continue;
    if (publication.sceneIds.length && !event.sceneIds.some(id => eligibleScenes.has(id))) continue;
    if (publication.categoryIds.length && !publication.categoryIds.includes(event.category)) continue;
    selected.set(occurrence.id, occurrence);
  }
  return [...selected.values()].sort((a, b) => (a.startsAt ?? "").localeCompare(b.startsAt ?? "") || a.id.localeCompare(b.id));
}
