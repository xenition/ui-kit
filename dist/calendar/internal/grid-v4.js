"use strict";
/**
 * The `calendar` module's own V4 vocabulary (web) — the twin of
 * `native/calendar/internal/grid-v4.ts`.
 *
 * The pure layout lives in `calendar/layout-v4.ts`, shared by both twins; the
 * tone tables in `primitives/internal/tone-v4`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRID_MIN_BLOCK = exports.GRID_GUTTER = exports.GRID_HOUR = exports.BLOCK_TINT = exports.TONE_VAR = exports.TONE_ON = exports.TONE_INK = exports.TONE_BG = exports.SKELETON_CLASS = exports.metaLine = void 0;
exports.eventTone = eventTone;
exports.blockGround = blockGround;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_BG", { enumerable: true, get: function () { return tone_v4_1.TONE_BG; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
Object.defineProperty(exports, "TONE_VAR", { enumerable: true, get: function () { return tone_v4_1.TONE_VAR; } });
/** An `EventTone` is a `ToneV4` — the two vocabularies already agree. */
function eventTone(tone) {
    return (tone ?? 'primary');
}
/** How far an event block's soft fill travels from the card toward its tone. */
exports.BLOCK_TINT = 16;
/** The soft ground an event block paints, as an inline background value. */
function blockGround(tone) {
    return `color-mix(in srgb, ${tone_v4_1.TONE_VAR[tone]} ${exports.BLOCK_TINT}%, var(--xen-card))`;
}
/**
 * The grid's vertical scale, as CSS length expressions off the spacing scale.
 *
 * `TimeGrid` and `WeekView` both hard-coded an hour height and a gutter, so on
 * a re-scaled seed the hour rules and the event blocks disagreed — which
 * compounds down a sixteen-hour day.
 */
exports.GRID_HOUR = 'calc(var(--xen-space-2xl) + var(--xen-space-sm))';
exports.GRID_GUTTER = 'var(--xen-space-2xl)';
exports.GRID_MIN_BLOCK = 'calc(var(--xen-space-lg) + var(--xen-space-sm))';
//# sourceMappingURL=grid-v4.js.map