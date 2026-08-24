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
exports.RewardStarV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * RewardStar, redesigned (v2): a **big star-burst tile**. One oversized filled
 * star sits in a tinted circular burst with the count set large as "value / max"
 * beneath, and the optional caption below that. Tapping the tile awards the next
 * star — `onReward(value + 1)`, wrapping to 1 once full — the reward gesture as a
 * single celebratory press. Distinct from v1's inline star row. Same props,
 * token-only.
 */
exports.RewardStarV2 = React.forwardRef(function RewardStarV2({ value, max = 5, size = 'md', label, color = 'warn', readOnly = false, onReward, className, ...rest }, ref) {
    const total = Math.max(0, Math.floor(max));
    const filled = Math.max(0, Math.min(total, Math.floor(value)));
    const interactive = !readOnly && typeof onReward === 'function';
    const burst = size === 'lg' ? 'h-24 w-24' : size === 'sm' ? 'h-16 w-16' : 'h-20 w-20';
    const award = () => onReward?.(filled >= total ? 1 : filled + 1);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-center justify-center rounded-full bg-warn/10', burst), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: filled > 0 ? '★' : '☆', size: "3xl", color: filled > 0 ? color : 'muted' }) }), (0, jsx_runtime_1.jsxs)("p", { className: "text-lg font-bold text-on-surface", children: [filled, (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [" / ", total] })] }), label ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }) : null] }));
    const a11y = `Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`;
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-reward-star": "", role: "img", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col items-center gap-1.5', className), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-reward-star": "", className: (0, cn_1.cn)('inline-flex', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${a11y}. Give a star`, onClick: award, className: "flex flex-col items-center gap-1.5 rounded-lg p-1 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:scale-100", children: inner }) }));
});
//# sourceMappingURL=RewardStarV2.js.map