import type { RealEstatePersona } from "@/site.config";
import type { Persona } from "./types";
import { luxury } from "./luxury";
import { sports } from "./sports";
import { firstTimeAgent } from "./first-time-agent";
import { mlmTransition } from "./mlm-transition";
import { established } from "./established";

export const personas: Record<RealEstatePersona, Persona> = {
  luxury,
  sports,
  "first-time-agent": firstTimeAgent,
  "mlm-transition": mlmTransition,
  established,
};

export function getPersona(key: RealEstatePersona): Persona {
  return personas[key] ?? established;
}

export type { Persona } from "./types";
