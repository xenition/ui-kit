/**
 * The `fieldservice` module's own V4 vocabulary (native) — the twin of
 * `fieldservice/internal/job-v4.ts`.
 *
 * The base module already had `internal/format.ts`, which stays untouched.
 * This file corrects the two things it got wrong and adds what the V4 line
 * needs.
 *
 * Nothing here is exported from the package.
 */

import type { XenitionNativeTheme } from '../../theme';
import { onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import {
  clearsHazard,
  hazardCount,
  isComplete,
  nextVerdict,
  type SafetyVerdict,
} from '../../../fieldservice/verdict-v4';

export { clearsHazard, hazardCount, isComplete, nextVerdict, onPair, skeletonFill, toneFill, toneInk };
export type { SafetyVerdict, ToneV4 };

/** How far a disc tint sits into the card behind it. One number, both twins. */
export const DISC_MIX = 0.12;

/** Blend two resolved colours. Native has no `color-mix`, so this is the mix. */
function blend(a: string, b: string, t: number): string {
  const parse = (hex: string): [number, number, number] => {
    const clean = hex.replace('#', '');
    const full =
      clean.length === 3
        ? clean
            .split('')
            .map((c) => c + c)
            .join('')
        : clean;
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ];
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const to = (x: number, y: number): string =>
    Math.round(y + (x - y) * t)
      .toString(16)
      .padStart(2, '0');
  return `#${to(ar, br)}${to(ag, bg)}${to(ab, bb)}`;
}

/**
 * One tint strength for the whole module, on both twins.
 *
 * The base's `withAlpha()` left the alpha to each call site: 0.10, 0.12 and
 * 0.14 all appear across the twelve components, and the web twin fixed every
 * slot at 10% while dropping `muted` to an **opaque ramp step** inside a map
 * its own doc calls "translucent". One helper, four different strengths.
 *
 * Mixing into `card` rather than laying a translucent wash over whatever
 * happens to be behind also means the disc is the same colour on a card, on a
 * sheet and on a page — which `withAlpha` never was.
 */
export function discGround(theme: XenitionNativeTheme, tone: ToneV4): string {
  return blend(toneFill(theme, tone), theme.colors.card, DISC_MIX);
}

/** A tone as the contrast-corrected **ink**, for a glyph drawn on that disc. */
export function discInk(theme: XenitionNativeTheme, tone: ToneV4): string {
  return toneInk(theme, tone);
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
export const TABULAR = { fontVariant: ['tabular-nums' as const] };

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
