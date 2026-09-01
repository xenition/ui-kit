/**
 * The `calendar` module's own V4 vocabulary (web) — the twin of
 * `native/calendar/internal/grid-v4.ts`.
 *
 * The pure layout lives in `calendar/layout-v4.ts`, shared by both twins; the
 * tone tables in `primitives/internal/tone-v4`.
 *
 * Nothing here is exported from the package.
 */

import {
  metaLine,
  SKELETON_CLASS,
  TONE_BG,
  TONE_INK,
  TONE_ON,
  TONE_VAR,
  type ToneV4,
} from '../../primitives/internal/tone-v4';
import type { EventTone } from '../types';

export { metaLine, SKELETON_CLASS, TONE_BG, TONE_INK, TONE_ON, TONE_VAR };
export type { ToneV4 };

/** An `EventTone` is a `ToneV4` — the two vocabularies already agree. */
export function eventTone(tone: EventTone | undefined): ToneV4 {
  return (tone ?? 'primary') as ToneV4;
}

/** How far an event block's soft fill travels from the card toward its tone. */
export const BLOCK_TINT = 16;

/** The soft ground an event block paints, as an inline background value. */
export function blockGround(tone: ToneV4): string {
  return `color-mix(in srgb, ${TONE_VAR[tone]} ${BLOCK_TINT}%, var(--xen-card))`;
}

/**
 * The grid's vertical scale, as CSS length expressions off the spacing scale.
 *
 * `TimeGrid` and `WeekView` both hard-coded an hour height and a gutter, so on
 * a re-scaled seed the hour rules and the event blocks disagreed — which
 * compounds down a sixteen-hour day.
 */
export const GRID_HOUR = 'calc(var(--xen-space-2xl) + var(--xen-space-sm))';
export const GRID_GUTTER = 'var(--xen-space-2xl)';
export const GRID_MIN_BLOCK = 'calc(var(--xen-space-lg) + var(--xen-space-sm))';
