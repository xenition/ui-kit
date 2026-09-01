/**
 * The `crm` module's own V4 vocabulary (web) — the twin of
 * `native/crm/internal/crm-v4.ts`.
 *
 * The base module already had a shared `internal.ts` with a
 * glyph + label + tone triple per status, which was the right idea. This file
 * corrects three things it got wrong and adds what the V4 line needs.
 *
 * Nothing here is exported from the package.
 */

import {
  clampPercent,
  metaLine,
  SKELETON_CLASS,
  TONE_INK,
  TONE_ON,
  type ToneV4,
} from '../../primitives/internal/tone-v4';
import { ACTIVITY_META, type ActivityKind, type CrmTone, type StatusMeta } from '../internal';

export { clampPercent, metaLine, SKELETON_CLASS, TONE_INK, TONE_ON };
export type { ToneV4 };

/**
 * A CRM tone as the contrast-corrected **ink** class.
 *
 * The base's `toneTextClass()` returned `text-${tone}` — `text-success`,
 * `text-danger`, `text-muted` — which are **fill** tokens. The theme is
 * explicit that they carry no contrast promise as text; a rendered audit
 * measured one pairing at 1.32:1. Every CRM component inherited that through
 * one shared helper, so this is one correction, not twelve.
 */
export function toneInkClass(tone: CrmTone): string {
  return TONE_INK[tone === 'accent' ? 'accent' : (tone as ToneV4)];
}

/**
 * The one badge shape the whole module wears.
 *
 * Web took `Badge`'s `solid` default and native passed `variant="soft"
 * size="sm"`, so a won deal was a saturated green pill on web and a tinted
 * chip on native — the module's single most repeated element, drawn two ways.
 * Both twins now spread this.
 */
export const BADGE_V4 = { variant: 'soft', size: 'sm' } as const;

/**
 * An activity kind is **identity, not status**.
 *
 * `ACTIVITY_META` typed `task` and `deal` as `success`, so an ordinary log of
 * completed calls rendered as a green feed and the tone stopped meaning
 * anything. The glyph already carries which kind it is; the tone goes neutral
 * and `success` stays free to mean something went well.
 */
export const ACTIVITY_META_V4: Record<ActivityKind, StatusMeta> = {
  call: { ...ACTIVITY_META.call, tone: 'neutral' },
  email: { ...ACTIVITY_META.email, tone: 'neutral' },
  meeting: { ...ACTIVITY_META.meeting, tone: 'neutral' },
  note: { ...ACTIVITY_META.note, tone: 'neutral' },
  task: { ...ACTIVITY_META.task, tone: 'neutral' },
  deal: { ...ACTIVITY_META.deal, tone: 'neutral' },
};

/** Money and any figure that stacks in a column. */
export const TABULAR_CLASS = 'tabular-nums';

/** The ground behind a skeleton or an unloaded avatar — never `border`. */
export const PLACEHOLDER_CLASS = SKELETON_CLASS;

/**
 * Attainment against a target, as a whole percent, clamped to 0-100.
 *
 * `DealForecast` divided without clamping, so a reversed period rendered a
 * negative percentage, and a bumper quarter drew a bar past the end of its
 * own track.
 */
export function attainment(totalCents: number, targetCents?: number): number | undefined {
  if (!targetCents || targetCents <= 0 || !Number.isFinite(totalCents)) return undefined;
  return clampPercent((totalCents / targetCents) * 100);
}

/**
 * Build the one accessible name an interactive CRM row or card should carry.
 *
 * Ten of the twelve components put a short label on the interactive root —
 * `Deal Acme`, `Contact Ada` — which **replaces** the subtree, so the value,
 * the probability, the score, the total and the word "Overdue" were never
 * announced at all. Commas, not `metaLine`'s middle dot: a reader either says
 * "middle dot" out loud or swallows the pause.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
