"use strict";
/**
 * The `agriculture` module's tone vocabulary (web) — now a **thin delegation**
 * to `primitives/internal/tone-v4`.
 *
 * This file wrote the tone-to-ink table first, for the module's ten status
 * enums. `automotive` then needed five more of the same and `beauty` five more
 * again, which is where a module-local helper stops being local.
 *
 * The names stay exactly as they were, so nothing in this module moved.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TONE_FILL = exports.TONE_INK = exports.SKELETON_CLASS = exports.GROUND_TINT = exports.toneGround = exports.metaLine = exports.clampPercent = void 0;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "toneGround", { enumerable: true, get: function () { return tone_v4_1.toneGround; } });
Object.defineProperty(exports, "GROUND_TINT", { enumerable: true, get: function () { return tone_v4_1.GROUND_TINT; } });
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_FILL", { enumerable: true, get: function () { return tone_v4_1.TONE_VAR; } });
//# sourceMappingURL=farm-v4.js.map