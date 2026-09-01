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
exports.DoctorCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Rating_1 = require("../primitives/Rating");
const AVAIL_META = {
    available: { label: 'Available today', tone: 'success', glyph: '●' },
    busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
    off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};
/**
 * DoctorCard — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a clinician profile: an elevated rounded card with a soft
 * shadow, the avatar + name + specialty, a star rating with review count, an
 * optional credential line, a labelled availability badge (glyph + label + tone,
 * never color alone), and a "Book" CTA. Honors the V4 `variant` — `full` (card,
 * default) and `compact` (a dense single row) — identical props/behavior to
 * {@link DoctorCardProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
exports.DoctorCardV4 = React.forwardRef(function DoctorCardV4({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel = 'Book', variant = 'full', className, ...rest }, ref) {
    const meta = availability ? AVAIL_META[availability] : undefined;
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const a11y = `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`;
    // ── compact: dense single row ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-doctor-card": "", "aria-label": a11y, className: (0, cn_1.cn)(shell, 'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs tabular-nums text-muted", children: [specialty, rating != null ? ` · ★ ${rating.toFixed(1)}` : ''] })] }), meta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-doctor-card": "", "aria-label": a11y, className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatar, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: specialty }), credentials ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: credentials }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })) : null] }), rating != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating }), reviewCount != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: [rating.toFixed(1), " (", reviewCount, ")"] })) : null] })) : null, onBook ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onClick: () => onBook(), children: bookLabel })) : null] }));
});
//# sourceMappingURL=DoctorCardV4.js.map