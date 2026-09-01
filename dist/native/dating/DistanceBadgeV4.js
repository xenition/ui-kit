"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceBadgeV4 = DistanceBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const BadgeV4_1 = require("../primitives/BadgeV4");
/**
 * **V4 distance badge** — the same props as {@link DistanceBadge}, nothing
 * added.
 *
 * ## Three changes
 *
 * 1. **A distance that is not a distance no longer renders `NaN km away`.**
 *    The base tested `distance == null` and then did arithmetic on whatever
 *    else arrived, so a `NaN` from an unresolved location fix — or a negative
 *    value from a bad payload — was formatted and shown. Anything that is not
 *    a finite, non-negative number now falls back to `nearbyLabel`, which is
 *    also the honest answer: we do not know how far away this person is.
 * 2. **The pin is never a second reader stop.** The glyph is decorative
 *    punctuation on a phrase that already says "away"; the badge is one
 *    accessible node whose name is the phrase alone. (This is the shape the
 *    web twin had to be restructured into — it announced the emoji.)
 * 3. **It draws on the V4 badge**, so `soft` is an opaque tint with the
 *    contrast-corrected `*Text` ink rather than a translucent wash that is a
 *    different colour on a card, on a photo scrim and on the page — and
 *    `variant` reaches it, which on web it did not.
 */
function DistanceBadgeV4({ distance, unit = 'km', nearbyThreshold = 1, nearbyLabel = 'Nearby', variant = 'soft', tone = 'neutral', glyph = '📍', }) {
    // A location fix that has not resolved arrives as `NaN` far more often than
    // as `undefined`, and `NaN < threshold` is false — so the base formatted it.
    const value = typeof distance === 'number' && Number.isFinite(distance) && distance >= 0 ? distance : null;
    const isNearby = value === null || value < nearbyThreshold;
    const rounded = value === null ? 0 : value < 10 ? Math.round(value * 10) / 10 : Math.round(value);
    const text = isNearby ? nearbyLabel : `${rounded} ${unit} away`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: text, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone, variant: variant, children: glyph ? `${glyph} ${text}` : text }) }));
}
//# sourceMappingURL=DistanceBadgeV4.js.map