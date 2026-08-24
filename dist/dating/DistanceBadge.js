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
exports.DistanceBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
/**
 * Compact "how far away" pill for a dating profile — the web parity of the native
 * distance badge. Formats a numeric `distance`+`unit` (rounding to one decimal
 * under 10), and collapses anything under `nearbyThreshold` to a friendly
 * `nearbyLabel` so a person's exact location is never implied. Token-bound via the
 * {@link Badge} primitive — no literal colors. The full distance is announced as a
 * single a11y label, never resting on color.
 */
exports.DistanceBadge = React.forwardRef(function DistanceBadge({ distance, unit = 'km', nearbyThreshold = 1, nearbyLabel = 'Nearby', 
// `variant` is accepted for native parity but the web Badge is single-tone.
variant: _variant = 'soft', tone = 'neutral', glyph = '📍', ...rest }, ref) {
    const isNearby = distance == null || distance < nearbyThreshold;
    const rounded = distance == null ? 0 : distance < 10 ? Math.round(distance * 10) / 10 : Math.round(distance);
    const text = isNearby ? nearbyLabel : `${rounded} ${unit} away`;
    return ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { ref: ref, tone: tone, "aria-label": text, ...rest, children: glyph ? `${glyph} ${text}` : text }));
});
//# sourceMappingURL=DistanceBadge.js.map