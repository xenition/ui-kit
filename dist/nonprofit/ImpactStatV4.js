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
exports.ImpactStatV4 = void 0;
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
// Soft-tone tile + glyph well. `success` has no ramp of its own, so it borrows
// the primary tint panel; the tone still reads through the glyph color.
const TINT_BG = {
    primary: 'bg-primary/10',
    success: 'bg-primary/10',
    accent: 'bg-accent/10',
};
/**
 * ImpactStat — **V4** "rally" design (web parity of the native V4). A single
 * mission metric drawn with the warm, elevated "rally" identity: a big legible
 * value numeral, an optional muted unit, a glyph chip in the tone color, a
 * caption label, and a supporting caption. Honors all three `variant`s —
 * `plain` (no surface), `card` (an elevated bordered surface with a soft
 * shadow), and `tile` (a filled soft-tone panel) — and all three `tone`s
 * (`primary | success | accent`), identical props/behavior to
 * {@link ImpactStatProps}. Tone reads through the glyph + value color, never
 * color alone. All colors come from the `--xen-*` token classes — no literals.
 */
exports.ImpactStatV4 = React.forwardRef(function ImpactStatV4({ value, label, unit, glyph, caption, variant = 'plain', tone = 'primary', className, ...rest }, ref) {
    const surfaceClass = variant === 'card'
        ? 'rounded-lg border border-border bg-surface p-md shadow-md'
        : variant === 'tile'
            ? (0, cn_1.cn)('rounded-lg p-md', TINT_BG[tone])
            : '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `${String(value)}${unit ? ` ${unit}` : ''} ${label}`, className: (0, cn_1.cn)('flex flex-col', surfaceClass, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-8 w-8 items-center justify-center rounded-full', TINT_BG[tone]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "base", color: ICON_COLOR[tone] }) })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold leading-none text-on-surface", children: value }), unit ? (0, jsx_runtime_1.jsx)("span", { className: "pb-0.5 text-base text-muted", children: unit }) : null] })] }), (0, jsx_runtime_1.jsx)("span", { className: "mt-xs text-sm text-muted", children: label }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 text-xs text-muted", children: caption }) : null] }));
});
//# sourceMappingURL=ImpactStatV4.js.map