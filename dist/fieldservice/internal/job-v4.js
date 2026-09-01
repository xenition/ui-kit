"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_CLASS = exports.TABULAR_CLASS = exports.BADGE_V4 = exports.TONE_ON = exports.TONE_INK = exports.SKELETON_CLASS = exports.nextVerdict = exports.isComplete = exports.hazardCount = exports.clearsHazard = void 0;
exports.discGround = discGround;
exports.discInkClass = discInkClass;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
const verdict_v4_1 = require("../verdict-v4");
Object.defineProperty(exports, "clearsHazard", { enumerable: true, get: function () { return verdict_v4_1.clearsHazard; } });
Object.defineProperty(exports, "hazardCount", { enumerable: true, get: function () { return verdict_v4_1.hazardCount; } });
Object.defineProperty(exports, "isComplete", { enumerable: true, get: function () { return verdict_v4_1.isComplete; } });
Object.defineProperty(exports, "nextVerdict", { enumerable: true, get: function () { return verdict_v4_1.nextVerdict; } });
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
function discGround(tone) {
    return (0, tone_v4_1.toneGround)(tone);
}
/**
 * A tone as the contrast-corrected **ink** class, for a glyph or a label drawn
 * on a tinted disc rather than on a fill.
 */
function discInkClass(tone) {
    return tone_v4_1.TONE_INK[tone];
}
/**
 * One badge shape for the whole module.
 *
 * Web never passed `variant`/`size` and took `Badge`'s `solid`/`md` defaults
 * while native always passed `soft`, usually `sm` — across **16 call sites**.
 * The same field-service screen was a wall of saturated pills on the web and
 * soft tints on the phone.
 */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
/** Hours, money and any figure that stacks down a timesheet. */
exports.TABULAR_CLASS = 'tabular-nums';
/** The ground behind a skeleton — never `border`, never a ramp step. */
exports.PLACEHOLDER_CLASS = tone_v4_1.SKELETON_CLASS;
/**
 * Build the one accessible name an interactive field-service row should carry.
 *
 * Eight components put a short label on the interactive root, which
 * **replaces** the subtree — and in every case what it dropped was the
 * operational payload: the priority, the defect note, the stock state, the
 * hazard flag, the money total, the ETA. A technician heard "Open" and never
 * "Emergency".
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=job-v4.js.map