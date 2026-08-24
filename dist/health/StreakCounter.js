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
exports.StreakCounter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * A prominent streak readout: a flame, the day count, and a caption. When
 * `count` is 0 it reads a muted "Start your streak" prompt instead of a cold
 * zero. Web parity of the native `StreakCounter`; all colors trace to `--xen-*`
 * token classes — no literals.
 */
exports.StreakCounter = React.forwardRef(function StreakCounter({ count, unit = 'day', label = 'streak', tone = 'warn', best, className, ...rest }, ref) {
    const safe = Math.max(Math.floor(count), 0);
    const unitLabel = safe === 1 ? unit : `${unit}s`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": safe === 0 ? 'No active streak' : `${safe} ${unitLabel} ${label}`, className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl leading-none", children: safe === 0 ? '🌱' : '🔥' }), safe === 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Start your streak" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-bold leading-none', internal_1.TEXT_CLASS[tone]), children: safe }), (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted", children: unitLabel })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: label })] })), best != null && best > 0 ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Best: ", Math.max(Math.floor(best), 0)] })) : null] }));
});
//# sourceMappingURL=StreakCounter.js.map