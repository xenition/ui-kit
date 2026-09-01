"use strict";
/**
 * Deck decisions and the photo scrim — **pure, and shared by both twins**, the
 * way `calendar/layout-v4.ts` is. The native twin imports it as
 * `../../dating/deck-v4`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHOTO_INK = exports.PHOTO_SCRIM_STRONG = exports.PHOTO_SCRIM = void 0;
exports.deckPosition = deckPosition;
exports.canRewind = canRewind;
/**
 * A scrim over a **photograph** is not a themed surface.
 *
 * Both twins built one from theme slots — `from-neutral-950` on web,
 * `withAlpha(colors.onSurface, 0.55)` on native — and the web ramp *mirrors*
 * under `[data-theme="dark"]` while `onSurface` is light in a dark theme. So
 * in dark mode the bottom of every profile photo was washed near-**white**,
 * and the white text on it disappeared.
 *
 * A photo does not follow the scheme, so neither does its scrim. These are
 * deliberately fixed, and deliberately not tokens.
 */
exports.PHOTO_SCRIM = 'rgba(0, 0, 0, 0.55)';
exports.PHOTO_SCRIM_STRONG = 'rgba(0, 0, 0, 0.72)';
/** Ink that sits on a photo scrim, in both schemes. */
exports.PHOTO_INK = '#ffffff';
/**
 * A deck position, spoken.
 *
 * Both twins built `Profile 3 of 12` and then hung it on a role-less element
 * where it was ignored, and neither announced it again when the deck moved —
 * so a screen-reader user never learned that a card had gone.
 */
function deckPosition(index, total, format) {
    const safeTotal = Math.max(0, Math.floor(total));
    const safeIndex = Math.min(Math.max(0, Math.floor(index)), Math.max(0, safeTotal - 1));
    return (format ?? ((i, n) => `Profile ${i + 1} of ${n}`))(safeIndex, safeTotal);
}
/**
 * Whether a rewind is available.
 *
 * `LikePassButtons` has always defined a `rewind` action and `SwipeDeck`
 * hard-coded `actions={['pass', 'superlike', 'like']}` and dropped `'rewind'`
 * on the floor in `onButton`. Pass — the one action a user most wants back —
 * was irreversible, unconfirmed, and impossible for a caller to make
 * reversible.
 */
function canRewind(history) {
    return history.length > 0;
}
//# sourceMappingURL=deck-v4.js.map