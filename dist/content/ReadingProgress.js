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
exports.ReadingProgress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Progress_1 = require("../primitives/Progress");
/** Clamp an arbitrary number into the `[0, 1]` reading fraction. */
function clampFraction(n) {
    if (Number.isNaN(n))
        return 0;
    return Math.max(0, Math.min(1, n));
}
/**
 * A reading-progress indicator for an article reader — the thin bar that fills
 * as the reader scrolls. Web (React DOM) mirror of the native `ReadingProgress`.
 * Composes the `Progress` primitive (0–100 scale) from a clamped `0`–`1`
 * fraction, so a scroll handler can drive it directly. A `labeled` variant adds
 * a percentage readout. All colors come from `--xen-*` token classes.
 */
exports.ReadingProgress = React.forwardRef(function ReadingProgress({ progress, variant = 'bar', className, ...rest }, ref) {
    const fraction = clampFraction(progress);
    const pct = Math.round(fraction * 100);
    if (variant === 'labeled') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(Progress_1.Progress, { value: pct, max: 100, tone: "primary", size: "sm" }) }), (0, jsx_runtime_1.jsx)("span", { "aria-label": `${pct} percent read`, className: "min-w-[34px] text-right text-xs font-semibold text-muted", children: `${pct}%` })] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": `${pct} percent read`, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(Progress_1.Progress, { value: pct, max: 100, tone: "primary", size: "sm" }) }));
});
//# sourceMappingURL=ReadingProgress.js.map