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
exports.LeadRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
/**
 * Dense list row for a lead, keyed by **temperature** (`hot` 🔥 / `warm` ☀ /
 * `cold` ❄). Temperature is shown as a glyph *and* a label so it never relies on
 * color; the matching tone (`text-danger`/`text-warn`/`text-primary`) is only
 * reinforcement. Shows optional value (cents → `formatMoney`) and a score badge.
 * When `onClick` is set the row is a `role="button"` div with Enter/Space
 * activation. All colors are `--xen-*` token classes.
 */
exports.LeadRow = React.forwardRef(function LeadRow({ name, company, temperature, valueCents, currency = 'USD', score, avatarUrl, selected = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.TEMPERATURE_META[temperature];
    const tempClass = (0, internal_1.toneTextClass)(meta.tone);
    const interactive = onClick ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label} lead ${name}${company ? `, ${company}` : ''}`, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', selected ? 'border-primary' : 'border-border', onClick && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-7 flex-col items-center', tempClass), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold", children: meta.label })] }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), company ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: company }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [valueCents != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: (0, commerce_1.formatMoney)(valueCents, currency) })) : null, score != null ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, internal_1.toneBadgeTone)(meta.tone), children: `${(0, internal_1.clampPct)(score)}` }) : null] })] }));
});
//# sourceMappingURL=LeadRow.js.map