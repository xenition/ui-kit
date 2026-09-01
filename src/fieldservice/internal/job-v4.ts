/**
 * The `fieldservice` module's own V4 vocabulary (web) — the twin of
 * `native/fieldservice/internal/job-v4.ts`.
 *
 * The base module already had `internal/format.ts`, which stays untouched.
 * This file corrects the two things it got wrong and adds what the V4 line
 * needs.
 *
 * Nothing here is exported from the package.
 */

import { SKELETON_CLASS, TONE_INK, TONE_ON, toneGround, type ToneV4 } from '../../primitives/internal/tone-v4';
import { clearsHazard, hazardCount, isComplete, nextVerdict, type SafetyVerdict } from '../verdict-v4';

export { clearsHazard, hazardCount, isComplete, nextVerdict, SKELETON_CLASS, TONE_INK, TONE_ON };
export type { SafetyVerdict, ToneV4 };

/**
 * One tint strength for the whole module, on both twins.
 *
 * `internal/format.ts`'s `DISC_TINT` fixed every slot at 10% and dropped
 * `muted` to `bg-neutral-100` — an **opaque ramp step** inside a map its own
 * doc calls "translucent". The native twin used `withAlpha()` with the alpha
 * chosen per call site: 0.10, 0.12 and 0.14 all appear. One helper, twelve
 * components, three strengths on native and a fourth on web.
 *
 * `toneGround` mixes the tone into `card` at one documented percentage, so the
 * disc behind a wrench glyph is the same colour in every component and on
 * every platform — and `muted` is translucent like the rest.
 */
export function discGround(tone: ToneV4): string {
  return toneGround(tone);
}

/**
 * A tone as the contrast-corrected **ink** class, for a glyph or a label drawn
 * on a tinted disc rather than on a fill.
 */
export function discInkClass(tone: ToneV4): string {
  return TONE_INK[tone];
}

/**
 * One badge shape for the whole module.
 *
 * Web never passed `variant`/`size` and took `Badge`'s `solid`/`md` defaults
 * while native always passed `soft`, usually `sm` — across **16 call sites**.
 * The same field-service screen was a wall of saturated pills on the web and
 * soft tints on the phone.
 */
export const BADGE_V4 = { variant: 'soft', size: 'sm' } as const;

/** Hours, money and any figure that stacks down a timesheet. */
export const TABULAR_CLASS = 'tabular-nums';

/** The ground behind a skeleton — never `border`, never a ramp step. */
export const PLACEHOLDER_CLASS = SKELETON_CLASS;

/**
 * Build the one accessible name an interactive field-service row should carry.
 *
 * Eight components put a short label on the interactive root, which
 * **replaces** the subtree — and in every case what it dropped was the
 * operational payload: the priority, the defect note, the stock state, the
 * hazard flag, the money total, the ETA. A technician heard "Open" and never
 * "Emergency".
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
