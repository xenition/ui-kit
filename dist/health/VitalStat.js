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
exports.VitalStat = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/** Icon / default label / default unit / accent tone per vital variant. */
const VARIANT_META = {
    'heart-rate': { glyph: '❤️', label: 'Heart rate', unit: 'bpm', color: 'danger' },
    steps: { glyph: '👟', label: 'Steps', unit: '', color: 'primary' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'warn' },
    distance: { glyph: '📍', label: 'Distance', unit: 'km', color: 'primary' },
    oxygen: { glyph: '🫁', label: 'Blood oxygen', unit: '%', color: 'accent' },
    'blood-pressure': { glyph: '🩺', label: 'Blood pressure', unit: 'mmHg', color: 'danger' },
    temperature: { glyph: '🌡️', label: 'Temperature', unit: '°C', color: 'warn' },
    respiration: { glyph: '💨', label: 'Respiration', unit: 'br/min', color: 'accent' },
};
/**
 * A single vital-sign tile: an emoji icon, the measured value with its unit, a
 * caption, and an optional trend delta. The `variant` picks sensible defaults
 * (icon / unit / accent tone) that individual props can override. Web parity of
 * the native `VitalStat`; colors resolve from `--xen-*` token classes — no
 * literals. Clickable when `onPress` is provided.
 */
exports.VitalStat = React.forwardRef(function VitalStat({ variant, value, unit, label, delta, onPress, className, ...rest }, ref) {
    const meta = VARIANT_META[variant];
    const resolvedUnit = unit ?? meta.unit;
    const resolvedLabel = label ?? meta.label;
    const deltaClass = delta == null || delta === 0 ? 'text-muted' : delta > 0 ? 'text-success' : 'text-danger';
    const a11y = `${resolvedLabel}: ${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted", children: resolvedLabel })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold', internal_1.TEXT_CLASS[meta.color]), children: value }), resolvedUnit ? (0, jsx_runtime_1.jsx)("span", { className: "pb-0.5 text-sm text-muted", children: resolvedUnit }) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', deltaClass), children: [delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : '', Math.abs(delta)] })) : null] }));
    const shell = 'flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]';
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", "aria-label": a11y, tabIndex: 0, onClick: onPress, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress();
            }
        }, className: (0, cn_1.cn)(shell, 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
});
//# sourceMappingURL=VitalStat.js.map