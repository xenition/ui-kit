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
exports.BehaviorBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const TONE_META = {
    positive: { glyph: '👍', badge: 'success', sign: '+' },
    negative: { glyph: '👎', badge: 'danger', sign: '−' },
    neutral: { glyph: '•', badge: 'neutral', sign: '' },
};
/**
 * A compact behavior chip for logging conduct: an icon + label, optionally with
 * a signed point value. Positive/negative is conveyed by the glyph and the
 * numeric sign in addition to the {@link Badge} tone (never color alone). When
 * `onClick` is set the chip is a real `<button>`. Token-bound throughout — no
 * literal colors.
 */
exports.BehaviorBadge = React.forwardRef(function BehaviorBadge({ label, tone = 'neutral', points, icon, onClick }, ref) {
    const meta = TONE_META[tone] ?? TONE_META.neutral;
    const glyph = icon ?? meta.glyph;
    const pointsLabel = typeof points === 'number' ? ` (${meta.sign}${Math.abs(points)})` : '';
    const a11y = `${tone} behavior: ${label}${pointsLabel}`;
    const text = `${glyph} ${label}${pointsLabel}`;
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "data-xen-behavior-badge": "", "aria-label": a11y, onClick: () => onClick(), className: "inline-flex rounded-full transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.badge, children: text }) }));
    }
    return ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { ref: ref, "data-xen-behavior-badge": "", "aria-label": a11y, tone: meta.badge, children: text }));
});
//# sourceMappingURL=BehaviorBadge.js.map