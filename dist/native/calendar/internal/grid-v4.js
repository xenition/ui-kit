"use strict";
/**
 * The `calendar` module's own V4 vocabulary: the grid metrics, and the event
 * tone resolved to the pieces a block needs.
 *
 * The pure layout — clustering, column packing, localized names — lives in
 * `calendar/layout-v4.ts`, shared by both twins. The tone-to-ink table lives
 * in `primitives/internal/tone-v4`. What is here is the part that needs a
 * resolved native theme.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCK_TINT = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.onPair = exports.metaLine = void 0;
exports.eventTone = eventTone;
exports.gridMetrics = gridMetrics;
exports.blockGround = blockGround;
const v4_depth_1 = require("../../../primitives/internal/v4-depth");
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
/** An `EventTone` is a `ToneV4` — the two vocabularies already agree. */
function eventTone(tone) {
    return (tone ?? 'primary');
}
/**
 * The grid's vertical scale, off the spacing scale rather than pinned at 56.
 *
 * `TimeGrid` and `WeekView` both hard-coded `hourHeight = 56` and a `GUTTER`
 * of 48, so on a seed with tighter spacing the hour rules and the event blocks
 * disagreed by a few pixels per hour — which compounds down a 16-hour day.
 */
function gridMetrics(theme) {
    const { spacing } = theme.tokens;
    return {
        hour: spacing['2xl'] + spacing.sm,
        gutter: spacing['2xl'],
        // A block shorter than this cannot show its own title.
        minBlock: spacing.lg + spacing.sm,
    };
}
/** How far an event block's soft fill travels from the surface toward its tone. */
exports.BLOCK_TINT = 0.16;
/** The soft ground an event block paints, for a tone. */
function blockGround(theme, tone) {
    return (0, v4_depth_1.mixToken)(theme.colors.card, (0, tone_v4_1.toneFill)(theme, tone), exports.BLOCK_TINT);
}
//# sourceMappingURL=grid-v4.js.map