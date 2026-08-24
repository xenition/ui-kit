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
exports.RewardStar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const SIZE_KEY = {
    sm: 'lg',
    md: 'xl',
    lg: '2xl',
};
/**
 * A tappable star-reward control: a row of star glyphs where the first `value`
 * are filled. Tapping the Nth star fires `onReward(N)` — the reward gesture.
 * Filled state is conveyed by a solid vs. outline glyph plus the a11y label
 * (never color alone). Filled color resolves to an {@link Icon} token slot; no
 * literal colors.
 */
exports.RewardStar = React.forwardRef(function RewardStar({ value, max = 5, size = 'md', label, color = 'warn', readOnly = false, onReward, className, ...rest }, ref) {
    const total = Math.max(0, Math.floor(max));
    const filled = Math.max(0, Math.min(total, Math.floor(value)));
    const iconSize = SIZE_KEY[size] ?? 'xl';
    const interactive = !readOnly && typeof onReward === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-reward-star": "", role: interactive ? 'group' : 'img', "aria-label": `Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`, className: (0, cn_1.cn)('flex flex-col items-start gap-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: Array.from({ length: total }).map((_, i) => {
                    const isFilled = i < filled;
                    const glyph = ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isFilled ? '★' : '☆', size: iconSize, color: isFilled ? color : 'muted' }));
                    if (!interactive) {
                        return (0, jsx_runtime_1.jsx)("span", { children: glyph }, i);
                    }
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Give ${i + 1} star${i === 0 ? '' : 's'}`, onClick: () => onReward?.(i + 1), className: "rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: glyph }, i));
                }) }), label ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }) : null] }));
});
//# sourceMappingURL=RewardStar.js.map