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
exports.RiskScore = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Progress_1 = require("../primitives/Progress");
const TIER = {
    low: { label: 'Low risk', glyph: '🟢', tone: 'success', text: 'text-success', tint: 'bg-success/10' },
    moderate: { label: 'Moderate risk', glyph: '🟡', tone: 'warn', text: 'text-warn', tint: 'bg-warn/10' },
    high: { label: 'High risk', glyph: '🔴', tone: 'danger', text: 'text-danger', tint: 'bg-danger/10' },
};
/** Derive a tier from a 0–100 score when one isn't provided. */
function tierFromScore(score) {
    if (score <= 33)
        return 'low';
    if (score <= 66)
        return 'moderate';
    return 'high';
}
/**
 * An underwriting risk gauge: a 0–100 score with a tier read out by
 * **glyph + label + color** (low → success, high → danger — never color alone),
 * a token `Progress` bar, and an optional factor list. The score is clamped to
 * 0–100 and rounded; the tier derives from the score when not given. Factor
 * indexing is guarded. Token-bound throughout. Web parity of the native
 * `RiskScore`.
 */
exports.RiskScore = React.forwardRef(function RiskScore({ score, tier, label = 'Risk score', factors = [], className, ...rest }, ref) {
    const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, Math.round(score))) : 0;
    const td = TIER[tier ?? tierFromScore(clamped)];
    const list = Array.isArray(factors) ? factors : [];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-label": `${label}: ${clamped} out of 100, ${td.label}`, className: "text-3xl font-bold text-on-surface", children: clamped }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "/ 100" })] })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', td.tint), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs", children: td.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', td.text), children: td.label })] })] }), (0, jsx_runtime_1.jsx)(Progress_1.Progress, { value: clamped, max: 100, tone: td.tone }), list.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "mt-[var(--xen-space-xs)] flex flex-col gap-[var(--xen-space-xs)]", children: list.map((factor, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex gap-[var(--xen-space-xs)] text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2022" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1", children: factor })] }, `${factor}-${i}`))) })) : null] }));
});
//# sourceMappingURL=RiskScore.js.map