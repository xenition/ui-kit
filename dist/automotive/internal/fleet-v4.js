"use strict";
/**
 * The `automotive` module's own V4 vocabulary (web) — the twin of
 * `native/automotive/internal/fleet-v4.ts`.
 *
 * The tone tables live in `primitives/internal/tone-v4`, promoted out of
 * `agriculture` once three verticals needed them. What stays here is the part
 * that is genuinely domain knowledge.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTE_DOTS = exports.toneGround = exports.TONE_VAR = exports.TONE_ON = exports.TONE_INK = exports.TONE_BG = exports.SKELETON_CLASS = exports.ratingParts = exports.metaLine = exports.clampPercent = void 0;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "ratingParts", { enumerable: true, get: function () { return tone_v4_1.ratingParts; } });
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_BG", { enumerable: true, get: function () { return tone_v4_1.TONE_BG; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
Object.defineProperty(exports, "TONE_VAR", { enumerable: true, get: function () { return tone_v4_1.TONE_VAR; } });
Object.defineProperty(exports, "toneGround", { enumerable: true, get: function () { return tone_v4_1.toneGround; } });
/**
 * How many dots draw the connector between two route points. Geometric: it is
 * a dashed line's dash count, not a spacing.
 */
exports.ROUTE_DOTS = 7;
//# sourceMappingURL=fleet-v4.js.map