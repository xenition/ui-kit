"use strict";
/**
 * The `agriculture` module's tone vocabulary — now a **thin delegation** to
 * `primitives/internal/tone-v4`.
 *
 * This file wrote the tone-to-ink table first, for the module's ten status
 * enums. `automotive` then needed five more of the same and `beauty` five
 * more again, which is where a module-local helper stops being local: twenty
 * enums across three modules cannot each own a copy of one correction.
 *
 * The names stay exactly as they were, so nothing in this module moved; the
 * table lives one level up. `FarmTone` is `ToneV4` under the module's own
 * noun, kept because the twelve components read better naming their own
 * domain.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toneInk = exports.skeletonFill = exports.metaLine = exports.clampPercent = void 0;
exports.skeletonBarStyle = skeletonBarStyle;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
/** One skeleton bar: a fraction of the width, at a step of the type scale. */
function skeletonBarStyle(theme, options) {
    const { tokens } = theme;
    return {
        width: options.width,
        height: tokens.typography.scale[options.step ?? 'base'],
        borderRadius: tokens.radius.sm,
        backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
    };
}
//# sourceMappingURL=farm-v4.js.map