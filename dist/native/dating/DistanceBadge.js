"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceBadge = DistanceBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * Compact "how far away" pill for a dating profile — the native distance badge.
 * Formats a numeric `distance`+`unit` (rounding to one decimal under 10), and
 * collapses anything under `nearbyThreshold` to a friendly `nearbyLabel` so a
 * person's exact location is never implied. Token-bound via the `Badge`
 * primitive — no literal colors. The full distance is announced as one a11y
 * node, never relying on color alone.
 */
function DistanceBadge({ distance, unit = 'km', nearbyThreshold = 1, nearbyLabel = 'Nearby', variant = 'soft', tone = 'neutral', glyph = '📍', }) {
    const isNearby = distance == null || distance < nearbyThreshold;
    const rounded = distance == null ? 0 : distance < 10 ? Math.round(distance * 10) / 10 : Math.round(distance);
    const text = isNearby ? nearbyLabel : `${rounded} ${unit} away`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: text, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, variant: variant, children: glyph ? `${glyph} ${text}` : text }) }));
}
//# sourceMappingURL=DistanceBadge.js.map