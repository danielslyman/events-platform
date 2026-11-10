import { z } from "zod";

export const occurrenceStatus = z.enum(["scheduled", "rescheduled", "cancelled", "expired"]);
export const trustStatus = z.enum(["candidate", "accepted", "needs_review", "rejected"]);
export const timeZone = z.string().min(1).refine((v) => { try { new Intl.DateTimeFormat("en", { timeZone: v }); return true; } catch { return false; } }, "Invalid IANA time zone");
export const occurrenceSchema = z.object({
  id: z.string().min(1), eventId: z.string().min(1),
  startsAt: z.iso.datetime({ offset: true }).nullable(),
  endsAt: z.iso.datetime({ offset: true }).nullable().optional(),
  timeZone, status: occurrenceStatus,
  venueId: z.string().nullable()
}).superRefine((o, ctx) => {
  if (o.startsAt && o.endsAt && Date.parse(o.endsAt) < Date.parse(o.startsAt))
    ctx.addIssue({ code: "custom", message: "End precedes start", path: ["endsAt"] });
});
export const eventSchema = z.object({
  id: z.string().min(1), title: z.string().min(1), organizerId: z.string().nullable(),
  sceneIds: z.array(z.string()), category: z.string().min(1), trust: trustStatus
});
export const venueSchema = z.object({
  id: z.string().min(1), name: z.string().min(1), cityId: z.string().min(1),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable()
});
export const sourceSchema = z.object({
  id: z.string().min(1), ownerId: z.string().min(1), attribution: z.string().min(1),
  rightsApproved: z.boolean(), retentionAllowed: z.boolean()
});
export const assertionSchema = z.object({
  id: z.string().min(1), sourceId: z.string().min(1), nativeId: z.string().min(1),
  eventId: z.string().nullable(), occurrenceId: z.string().nullable(),
  title: z.string().min(1), startsAt: z.iso.datetime({ offset: true }).nullable(),
  venueId: z.string().nullable(), observedAt: z.iso.datetime({ offset: true }),
  sourceUrl: z.url(), cancelled: z.boolean().default(false)
});
export const sceneSchema = z.object({ id: z.string().min(1), parentIds: z.array(z.string()) });
export const publicationSchema = z.object({
  id: z.string().min(1), cityIds: z.array(z.string()), sceneIds: z.array(z.string()),
  categoryIds: z.array(z.string())
});
export type Event = z.infer<typeof eventSchema>;
export type Occurrence = z.infer<typeof occurrenceSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Assertion = z.infer<typeof assertionSchema>;
export type Scene = z.infer<typeof sceneSchema>;
export type Publication = z.infer<typeof publicationSchema>;

export function sceneDescendants(scenes: Scene[], parentId: string): Set<string> {
  const result = new Set<string>([parentId]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const s of scenes) if (!result.has(s.id) && s.parentIds.some(p => result.has(p))) {
      result.add(s.id); changed = true;
    }
  }
  return result;
}
export function assertAcyclicScenes(scenes: Scene[]): void {
  const byId = new Map(scenes.map(s => [s.id, s]));
  if (byId.size !== scenes.length) throw new Error("Duplicate scene ID");
  const visiting = new Set<string>(), visited = new Set<string>();
  function visit(id: string): void {
    if (visiting.has(id)) throw new Error("Scene cycle");
    if (visited.has(id)) return;
    const scene = byId.get(id);
    if (!scene) throw new Error("Unknown parent scene: " + id);
    visiting.add(id);
    for (const p of scene.parentIds) visit(p);
    visiting.delete(id); visited.add(id);
  }
  for (const scene of scenes) visit(scene.id);
}
