"use strict";
/**
 * The `dating` module's own V4 vocabulary (native) — the twin of
 * `dating/internal/profile-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTION_TONE = exports.toneInk = exports.skeletonFill = exports.PHOTO_SCRIM_STRONG = exports.PHOTO_SCRIM = exports.PHOTO_INK = exports.deckPosition = void 0;
exports.placeholderGround = placeholderGround;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const deck_v4_1 = require("../../../dating/deck-v4");
Object.defineProperty(exports, "PHOTO_INK", { enumerable: true, get: function () { return deck_v4_1.PHOTO_INK; } });
Object.defineProperty(exports, "PHOTO_SCRIM", { enumerable: true, get: function () { return deck_v4_1.PHOTO_SCRIM; } });
Object.defineProperty(exports, "PHOTO_SCRIM_STRONG", { enumerable: true, get: function () { return deck_v4_1.PHOTO_SCRIM_STRONG; } });
Object.defineProperty(exports, "deckPosition", { enumerable: true, get: function () { return deck_v4_1.deckPosition; } });
/**
 * The five deck actions are **identities, not statuses**.
 *
 * `LikePassButtons` typed them `rewind → warn`, `pass → danger`,
 * `superlike → accent`, `like → success`, `boost → primary` — so `danger` and
 * `warn`, the two slots that mean something has gone wrong, were spent on
 * ordinary non-destructive choices sitting in one toolbar. The glyph carries
 * which action it is.
 */
exports.ACTION_TONE = {
    rewind: 'neutral',
    pass: 'neutral',
    superlike: 'accent',
    like: 'primary',
    boost: 'primary',
};
/** The ground behind a skeleton or an unloaded photo — never `border`. */
function placeholderGround(theme) {
    return (0, tone_v4_1.skeletonFill)(theme);
}
/** Build the one accessible name a profile card should carry. */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=profile-v4.js.map