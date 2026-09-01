"use strict";
/**
 * The `automotive` module's own V4 vocabulary: the status enums resolved to a
 * tone, and the two geometry constants its map-ish components share.
 *
 * The tone-to-ink table itself lives in `primitives/internal/tone-v4` — three
 * verticals needed it, so it was promoted out of `agriculture`. What stays
 * here is the part that is genuinely domain knowledge: which word a vehicle
 * state is, and which tone it earns.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTE_DOTS = exports.MARKER_STEP = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.ratingParts = exports.onPair = exports.metaLine = exports.clampPercent = void 0;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "ratingParts", { enumerable: true, get: function () { return tone_v4_1.ratingParts; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
/**
 * The route marker's diameter, as a multiple of the spacing scale.
 *
 * `TripRoute` pinned `width: 24, height: 24, marginLeft: -12` — three literals
 * that have to stay in sync, and did not scale with the seed. One expression
 * now, and the offset is derived from it rather than remembered.
 */
exports.MARKER_STEP = 1.5;
/**
 * How many dots draw the connector between two route points. Geometric: it is
 * a dashed line's dash count, not a spacing.
 */
exports.ROUTE_DOTS = 7;
//# sourceMappingURL=fleet-v4.js.map