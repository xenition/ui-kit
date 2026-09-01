"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_CLASS = exports.TABULAR_CLASS = exports.ACTIVITY_META_V4 = exports.BADGE_V4 = exports.TONE_ON = exports.TONE_INK = exports.SKELETON_CLASS = exports.metaLine = exports.clampPercent = void 0;
exports.toneInkClass = toneInkClass;
exports.attainment = attainment;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
const internal_1 = require("../internal");
/**
 * A CRM tone as the contrast-corrected **ink** class.
 *
 * The base's `toneTextClass()` returned `text-${tone}` — `text-success`,
 * `text-danger`, `text-muted` — which are **fill** tokens. The theme is
 * explicit that they carry no contrast promise as text; a rendered audit
 * measured one pairing at 1.32:1. Every CRM component inherited that through
 * one shared helper, so this is one correction, not twelve.
 */
function toneInkClass(tone) {
    return tone_v4_1.TONE_INK[tone === 'accent' ? 'accent' : tone];
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
exports.TABULAR_CLASS = 'tabular-nums';
/** The ground behind a skeleton or an unloaded avatar — never `border`. */
exports.PLACEHOLDER_CLASS = tone_v4_1.SKELETON_CLASS;
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