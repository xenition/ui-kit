/**
 * The `crm` module's own V4 vocabulary (native) — the twin of
 * `crm/internal/crm-v4.ts`.
 *
 * The base module already had a shared `internal.ts` with a
 * glyph + label + tone triple per status, which was the right idea. This file
 * corrects three things it got wrong and adds what the V4 line needs.
 *
 * Nothing here is exported from the package.
 */
import type { XenitionNativeTheme } from '../../theme';
import { clampPercent, metaLine, onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { type ActivityKind, type CrmTone, type StatusMeta } from '../internal';
export { clampPercent, metaLine, onPair, skeletonFill, toneFill, toneInk };
export type { ToneV4 };
/**
 * A CRM tone as the contrast-corrected **ink**.
 *
 * The base's `toneColor()` returned `colors[tone]` — a **fill** slot — for
 * text and glyphs. The theme is explicit that those carry no contrast promise
 * as text; a rendered audit measured one pairing at 1.32:1. Every CRM
 * component inherited that through one shared helper, so this is one
 * correction, not twelve.
 */
export declare function toneInkOf(theme: XenitionNativeTheme, tone: CrmTone): string;
/**
 * The ink guaranteed against a CRM tone's fill.
 *
 * `TagFilterBar` filled a selected chip with `colors[tone]` and drew the label
 * in `colors.onSurface` — body ink on a saturated brand fill, with no contrast
 * promise at all. Only `primary` and `accent` were paired correctly.
 */
export declare function toneOnOf(theme: XenitionNativeTheme, tone: CrmTone): string;
/**
 * The one badge shape the whole module wears.
 *
 * Web took `Badge`'s `solid` default and native passed `variant="soft"
 * size="sm"`, so a won deal was a saturated green pill on web and a tinted
 * chip on native — the module's single most repeated element, drawn two ways.
 * Both twins now spread this.
 */
export declare const BADGE_V4: {
    readonly variant: "soft";
    readonly size: "sm";
};
/**
 * An activity kind is **identity, not status**.
 *
 * `ACTIVITY_META` typed `task` and `deal` as `success`, so an ordinary log of
 * completed calls rendered as a green feed and the tone stopped meaning
 * anything. The glyph already carries which kind it is; the tone goes neutral
 * and `success` stays free to mean something went well.
 */
export declare const ACTIVITY_META_V4: Record<ActivityKind, StatusMeta>;
/** Money and any figure that stacks in a column. */
export declare const TABULAR: {
    fontVariant: "tabular-nums"[];
};
/**
 * Attainment against a target, as a whole percent, clamped to 0-100.
 *
 * `DealForecast` divided without clamping, so a reversed period rendered a
 * negative percentage, and a bumper quarter drew a bar past the end of its
 * own track.
 */
export declare function attainment(totalCents: number, targetCents?: number): number | undefined;
/**
 * Build the one accessible name an interactive CRM row or card should carry.
 *
 * Ten of the twelve components put a short label on the interactive root —
 * `Deal Acme`, `Contact Ada` — which **replaces** the subtree, so the value,
 * the probability, the score, the total and the word "Overdue" were never
 * announced at all. Commas, not `metaLine`'s middle dot: a reader either says
 * "middle dot" out loud or swallows the pause.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=crm-v4.d.ts.map