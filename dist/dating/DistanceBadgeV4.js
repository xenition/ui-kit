"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const BadgeV4_1 = require("../primitives/BadgeV4");
/**
 * **V4 distance badge** — the web twin of the native `DistanceBadgeV4`, same
 * props as {@link DistanceBadge}.
 *
 * ## Three changes
 *
 * 1. **`variant` is honoured.** It was destructured into `_variant` and thrown
 *    away, on the stated grounds that "the web `Badge` renders a single soft
 *    tone" — which is not true: the web `Badge` has a full solid/soft/outline
 *    map and always has. The consequence was that the same badge, given the
 *    same props, rendered **solid on web and soft on native**, and the default
 *    (`'soft'`) was the one the caller never got.
 * 2. **The pin is not a reader stop.** The glyph was concatenated into the
 *    badge's text, so "📍" reached the accessibility tree — read out loud as
 *    "round pushpin" by some readers and silently swallowed by others. It is
 *    decorative and is now marked as such; the distance is the name.
 * 3. **It is a `BadgeV4`**, so the badge owns its ground: `soft` composites its
 *    tint into `surface` opaquely instead of borrowing whatever it is sitting
 *    on — and this badge sits on a profile photo about as often as it sits on
 *    a card.
 */
exports.DistanceBadgeV4 = React.forwardRef(function DistanceBadgeV4({ distance, unit = 'km', nearbyThreshold = 1, nearbyLabel = 'Nearby', variant = 'soft', tone = 'neutral', glyph = '📍', ...rest }, ref) {
    const isNearby = distance == null || distance < nearbyThreshold;
    const rounded = distance == null ? 0 : distance < 10 ? Math.round(distance * 10) / 10 : Math.round(distance);
    const text = isNearby ? nearbyLabel : `${rounded} ${unit} away`;
    return ((0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { ref: ref, tone: tone, variant: variant, "aria-label": text, ...rest, children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "leading-none", children: glyph })) : null, (0, jsx_runtime_1.jsx)("span", { children: text })] }));
});
//# sourceMappingURL=DistanceBadgeV4.js.map