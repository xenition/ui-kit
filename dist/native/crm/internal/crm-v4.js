"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABULAR = exports.ACTIVITY_META_V4 = exports.BADGE_V4 = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.onPair = exports.metaLine = exports.clampPercent = void 0;
exports.toneInkOf = toneInkOf;
exports.toneOnOf = toneOnOf;
exports.attainment = attainment;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const internal_1 = require("../internal");
/**
 * A CRM tone as the contrast-corrected **ink**.
 *
 * The base's `toneColor()` returned `colors[tone]` — a **fill** slot — for
 * text and glyphs. The theme is explicit that those carry no contrast promise
 * as text; a rendered audit measured one pairing at 1.32:1. Every CRM
 * component inherited that through one shared helper, so this is one
 * correction, not twelve.
 */
function toneInkOf(theme, tone) {
    return (0, tone_v4_1.toneInk)(theme, tone);
}
/**
 * The ink guaranteed against a CRM tone's fill.
 *
 * `TagFilterBar` filled a selected chip with `colors[tone]` and drew the label
 * in `colors.onSurface` — body ink on a saturated brand fill, with no contrast
 * promise at all. Only `primary` and `accent` were paired correctly.
 */
function toneOnOf(theme, tone) {
    return (0, tone_v4_1.onPair)(theme, tone);
}
/**
 * The one badge shape the whole module wears.
 *
 * Web took `Badge`'s `solid` default and native passed `variant="soft"
 * size="sm"`, so a won deal was a saturated green pill on web and a tinted
 * chip on native — the module's single most repeated element, drawn two ways.
 * Both twins now spread this.
 */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
/**
 * An activity kind is **identity, not status**.
 *
 * `ACTIVITY_META` typed `task` and `deal` as `success`, so an ordinary log of
 * completed calls rendered as a green feed and the tone stopped meaning
 * anything. The glyph already carries which kind it is; the tone goes neutral
 * and `success` stays free to mean something went well.
 */
exports.ACTIVITY_META_V4 = {
    call: { ...internal_1.ACTIVITY_META.call, tone: 'neutral' },
    email: { ...internal_1.ACTIVITY_META.email, tone: 'neutral' },
    meeting: { ...internal_1.ACTIVITY_META.meeting, tone: 'neutral' },
    note: { ...internal_1.ACTIVITY_META.note, tone: 'neutral' },
    task: { ...internal_1.ACTIVITY_META.task, tone: 'neutral' },
    deal: { ...internal_1.ACTIVITY_META.deal, tone: 'neutral' },
};
/** Money and any figure that stacks in a column. */
exports.TABULAR = { fontVariant: ['tabular-nums'] };
/**
 * Attainment against a target, as a whole percent, clamped to 0-100.
 *
 * `DealForecast` divided without clamping, so a reversed period rendered a
 * negative percentage, and a bumper quarter drew a bar past the end of its
 * own track.
 */
function attainment(totalCents, targetCents) {
    if (!targetCents || targetCents <= 0 || !Number.isFinite(totalCents))
        return undefined;
    return (0, tone_v4_1.clampPercent)((totalCents / targetCents) * 100);
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
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=crm-v4.js.map