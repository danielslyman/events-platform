import { describe, it, expect } from "vitest";
import { selectOccurrences } from "../src/index.js";
const inventory = {
 events:[{id:"evt-1",title:"Synthetic Techno",organizerId:null,sceneIds:["industrial"],category:"music",trust:"accepted" as const},{id:"evt-2",title:"Berlin",organizerId:null,sceneIds:["techno"],category:"music",trust:"accepted" as const}],
 occurrences:[{id:"occ-1",eventId:"evt-1",startsAt:"2026-11-20T20:00:00+01:00",timeZone:"Europe/Berlin",status:"scheduled" as const,venueId:"munich-v"},{id:"occ-2",eventId:"evt-1",startsAt:"2026-11-21T20:00:00+01:00",timeZone:"Europe/Berlin",status:"cancelled" as const,venueId:"munich-v"},{id:"occ-3",eventId:"evt-2",startsAt:"2026-11-20T20:00:00+01:00",timeZone:"Europe/Berlin",status:"scheduled" as const,venueId:"berlin-v"}],
 venues:[{id:"munich-v",name:"Synthetic Munich Venue",cityId:"munich",latitude:48.13,longitude:11.57},{id:"berlin-v",name:"Synthetic Berlin Venue",cityId:"berlin",latitude:52.5,longitude:13.4}],
 scenes:[{id:"electronic",parentIds:[]},{id:"techno",parentIds:["electronic"]},{id:"industrial",parentIds:["techno"]}]
};
describe("publication isolation", () => {
 it("reuses canonical identity across general and techno publications", () => {
   const general={id:"munich-general",cityIds:["munich"],sceneIds:[],categoryIds:[]};
   const techno={...general,id:"munich-techno",sceneIds:["techno"]};
   expect(selectOccurrences(general,inventory).map(x=>x.id)).toEqual(["occ-1"]);
   expect(selectOccurrences(techno,inventory).map(x=>x.id)).toEqual(["occ-1"]);
 });
 it("does not leak Berlin or cancelled occurrences",()=>expect(selectOccurrences({id:"munich",cityIds:["munich"],sceneIds:[],categoryIds:[]},inventory)).toHaveLength(1));
});
