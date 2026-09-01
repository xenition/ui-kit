"use strict";
/**
 * The `content` module's own V4 vocabulary (native) — the twin of
 * `content/internal/reading-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toneInk = exports.skeletonFill = exports.metaLine = exports.clampPercent = void 0;
exports.mediaGround = mediaGround;
exports.readingPercent = readingPercent;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
/**
 * The ground behind an image, artwork or hero that has not loaded.
 *
 * The two twins disagreed about this pixel: web painted it `bg-neutral-100` —
 * a raw ramp step, so it ignored the seed — and native painted it
 * `colors.border`, a **hairline** token spent as a fill. `card` is the token
 * the theme added for a raised surface, and it is the same colour on both.
 */
function mediaGround(theme) {
    return theme.colors.card;
}
/**
 * A reading position as a whole percent, 0-100.
 *
 * `ReadingProgress` took a raw number and handed it straight to the bar, so a
 * caller mid-computation could push the fill past the track.
 */
function readingPercent(value) {
    return (0, tone_v4_1.clampPercent)(value) ?? 0;
}
/**
 * Build the one accessible name a multi-part editorial row should carry.
 *
 * Commas, not `metaLine`'s middle dot: this is a spoken sentence, and a
 * screen reader either says "middle dot" out loud or swallows the pause.
 * `metaLine` stays for the *visible* meta line, where the dot is the point.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=reading-v4.js.map