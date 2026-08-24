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
exports.BodyMetricCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Sparkline_1 = require("../charts/Sparkline");
const VARIANT_META = {
    weight: { glyph: '⚖️', label: 'Weight', unit: 'kg' },
    bmi: { glyph: '📊', label: 'BMI', unit: '' },
    'body-fat': { glyph: '📉', label: 'Body fat', unit: '%' },
    muscle: { glyph: '💪', label: 'Muscle mass', unit: 'kg' },
    waist: { glyph: '📏', label: 'Waist', unit: 'cm' },
    'blood-sugar': { glyph: '🩸', label: 'Blood sugar', unit: 'mg/dL' },
};
/**
 * A body-composition metric card: icon + label, the current value with unit, an
 * optional change delta, and an inline {@link Sparkline} trend. `lowerIsBetter`
 * flips the delta tone for metrics where a decrease is good. Web parity of the
 * native `BodyMetricCard`; colors trace to `--xen-*` token classes — no literals.
 * Clickable when `onPress` is set.
 */
exports.BodyMetricCard = React.forwardRef(function BodyMetricCard({ variant, value, unit, delta, lowerIsBetter = false, trend, onPress, className, ...rest }, ref) {
    const meta = VARIANT_META[variant];
    const resolvedUnit = unit ?? meta.unit;
    let deltaClass = 'text-muted';
    let trendColor = 'primary';
    if (delta != null && delta !== 0) {
        const good = lowerIsBetter ? delta < 0 : delta > 0;
        deltaClass = good ? 'text-success' : 'text-danger';
        trendColor = good ? 'success' : 'danger';
    }
    const a11y = `${meta.label}: ${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: meta.label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold text-on-surface", children: value }), resolvedUnit ? (0, jsx_runtime_1.jsx)("span", { className: "pb-0.5 text-base text-muted", children: resolvedUnit }) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', deltaClass), children: [delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : '', Math.abs(delta), resolvedUnit ? ` ${resolvedUnit}` : ''] })) : null, trend && trend.length > 0 ? ((0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: trend, color: trendColor, "aria-label": `${meta.label} trend over ${trend.length} readings` })) : null] }));
    const shell = 'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]';
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", "aria-label": a11y, tabIndex: 0, onClick: onPress, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress();
            }
        }, className: (0, cn_1.cn)(shell, 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
});
//# sourceMappingURL=BodyMetricCard.js.map