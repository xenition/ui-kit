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
exports.WaterTracker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A hydration tracker rendered as a row of tappable glass icons: filled glasses
 * up to `count`, empty ones to `goal`. Tapping a glass sets the count to that
 * position (tapping the last filled glass clears it back one). Shows a
 * `current / goal` and optional ml total. Guards `goal <= 0` with a muted note.
 * Web parity of the native `WaterTracker`; token-only colors.
 */
exports.WaterTracker = React.forwardRef(function WaterTracker({ count, goal, mlPerGlass, onChange, className, ...rest }, ref) {
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('text-sm text-muted', className), ...rest, children: "No hydration goal set" }));
    }
    const safeGoal = Math.floor(goal);
    const filled = Math.min(Math.max(Math.floor(count), 0), safeGoal);
    const met = filled >= safeGoal;
    const handlePress = (index) => {
        if (!onChange)
            return;
        const position = index + 1;
        onChange(position === filled ? position - 1 : position);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `Water: ${filled} of ${safeGoal} glasses${met ? ', goal reached' : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: "\uD83D\uDCA7 Water" }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', met ? 'text-success' : 'text-muted'), children: [filled, " / ", safeGoal, mlPerGlass != null ? `  ·  ${filled * mlPerGlass} ml` : ''] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: Array.from({ length: safeGoal }, (_, i) => {
                    const isFilled = i < filled;
                    const glassLabel = `Glass ${i + 1}, ${isFilled ? 'filled' : 'empty'}`;
                    const glyph = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xl leading-none', isFilled ? 'opacity-100' : 'opacity-30'), children: "\uD83E\uDD5B" }));
                    if (!onChange) {
                        return ((0, jsx_runtime_1.jsx)("span", { "aria-label": glassLabel, children: glyph }, i));
                    }
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": glassLabel, onClick: () => handlePress(i), className: "transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: glyph }, i));
                }) })] }));
});
//# sourceMappingURL=WaterTracker.js.map