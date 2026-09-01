"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABULAR = exports.BADGE_V4 = exports.DISC_MIX = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.onPair = exports.nextVerdict = exports.isComplete = exports.hazardCount = exports.clearsHazard = void 0;
exports.discGround = discGround;
exports.discInk = discInk;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const verdict_v4_1 = require("../../../fieldservice/verdict-v4");
Object.defineProperty(exports, "clearsHazard", { enumerable: true, get: function () { return verdict_v4_1.clearsHazard; } });
Object.defineProperty(exports, "hazardCount", { enumerable: true, get: function () { return verdict_v4_1.hazardCount; } });
Object.defineProperty(exports, "isComplete", { enumerable: true, get: function () { return verdict_v4_1.isComplete; } });
Object.defineProperty(exports, "nextVerdict", { enumerable: true, get: function () { return verdict_v4_1.nextVerdict; } });
/** How far a disc tint sits into the card behind it. One number, both twins. */
exports.DISC_MIX = 0.12;
/** Blend two resolved colours. Native has no `color-mix`, so this is the mix. */
function blend(a, b, t) {
    const parse = (hex) => {
        const clean = hex.replace('#', '');
        const full = clean.length === 3
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
    const to = (x, y) => Math.round(y + (x - y) * t)
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
function discGround(theme, tone) {
    return blend((0, tone_v4_1.toneFill)(theme, tone), theme.colors.card, exports.DISC_MIX);
}
/** A tone as the contrast-corrected **ink**, for a glyph drawn on that disc. */
function discInk(theme, tone) {
    return (0, tone_v4_1.toneInk)(theme, tone);
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
exports.TABULAR = { fontVariant: ['tabular-nums'] };
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