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
exports.ImpactStat = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
// Web `Icon` has no `accent` slot → map it to `primary` (kit gotcha).
const ICON_COLOR = {
    primary: 'primary',
    success: 'success',
    accent: 'primary',
};
// Ramp tints exist for primary/accent; success has no ramp, so it borrows the
// primary tint panel (tone still reads through the glyph chip + value color).
const TILE_BG = {
    primary: 'bg-primary-50',
    success: 'bg-primary-50',
    accent: 'bg-accent-50',
};
const CHIP_BG = {
    primary: 'bg-primary-50',
    success: 'bg-primary-50',
    accent: 'bg-accent-50',
};
const VALUE_COLOR = {
    primary: 'text-on-surface',
    success: 'text-on-surface',
    accent: 'text-on-surface',
};
/**
 * Web parity of the native `ImpactStat`: a single impact metric — a large
 * token-scaled figure, an optional unit, a caption label, and an optional glyph
 * chip. `variant` renders it bare (`plain`), inside a bordered `card`, or as a
 * tinted `tile`. The glyph is decorative; the metric is exposed as a group with
 * an `aria-label`. All colors come from the `--xen-*` token classes — no literal
 * colors.
 */
exports.ImpactStat = React.forwardRef(function ImpactStat({ value, label, unit, glyph, caption, variant = 'plain', tone = 'primary', className, ...rest }, ref) {
    const containerClass = variant === 'card'
        ? 'rounded-lg border border-border bg-surface p-md'
        : variant === 'tile'
            ? (0, cn_1.cn)('rounded-lg p-md', TILE_BG[tone])
            : '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `${String(value)}${unit ? ` ${unit}` : ''} ${label}`, className: (0, cn_1.cn)('flex flex-col', containerClass, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-8 w-8 items-center justify-center rounded-full', CHIP_BG[tone]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "base", color: ICON_COLOR[tone] }) })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-extrabold leading-none', VALUE_COLOR[tone]), children: value }), unit ? (0, jsx_runtime_1.jsx)("span", { className: "pb-0.5 text-base text-muted", children: unit }) : null] })] }), (0, jsx_runtime_1.jsx)("span", { className: "mt-xs text-sm text-muted", children: label }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 text-xs text-muted", children: caption }) : null] }));
});
//# sourceMappingURL=ImpactStat.js.map