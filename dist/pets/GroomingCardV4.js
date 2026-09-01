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
exports.GroomingCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const SERVICE_META = {
    bath: { glyph: '🛁', label: 'Bath' },
    haircut: { glyph: '✂️', label: 'Haircut' },
    nails: { glyph: '💅', label: 'Nail trim' },
    teeth: { glyph: '🦷', label: 'Teeth cleaning' },
    deshedding: { glyph: '🧹', label: 'De-shedding' },
    full: { glyph: '🐩', label: 'Full groom' },
};
const STATUS_META = {
    scheduled: { label: 'Scheduled', tone: 'primary' },
    due: { label: 'Due', tone: 'warn' },
    overdue: { label: 'Overdue', tone: 'danger' },
    done: { label: 'Done', tone: 'success' },
};
/**
 * GroomingCard — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a grooming service: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the service glyph in a soft-primary
 * tinted well, a bold service name, a muted groomer line, a labelled status Badge,
 * and the last/next dates shown as soft-primary chips beside a rounded book CTA.
 * "Book" stays for anything not yet done. Same props/behavior as
 * {@link GroomingCardProps}; service + status both read via glyph + labelled chip
 * (never color alone). All colors from `--xen-*` token classes (no literals).
 */
exports.GroomingCardV4 = React.forwardRef(function GroomingCardV4({ service, status, groomer, lastDone, nextDue, price, bookLabel = 'Book', onBook, className, variant = 'card' }, ref) {
    const meta = SERVICE_META[service];
    const statusMeta = STATUS_META[status];
    const showBook = onBook != null && status !== 'done';
    const a11y = `${meta.label}, ${statusMeta.label}${nextDue ? `, next due ${nextDue}` : ''}`;
    const glyphWell = (size) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full bg-primary/10', size), "aria-hidden": "true", children: meta.glyph }));
    const statusBadge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(statusMeta.tone), variant: "soft", children: statusMeta.label }));
    // ── compact ───────────────────────────────────────────────────────────────
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-sm)] shadow-md', className), children: [glyphWell('h-9 w-9 text-lg'), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: meta.label }), groomer ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["\u2702\uFE0F ", groomer] }) : null] }), statusBadge, price ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex shrink-0 items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface", children: price })) : null] }));
    }
    // ── card (default) ─────────────────────────────────────────────────────────
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [glyphWell('h-11 w-11 text-xl'), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: meta.label }), groomer ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: ["\u2702\uFE0F ", groomer] }) : null] }), statusBadge] }), lastDone || nextDue ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: [lastDone ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface", children: ["Last \u00B7 ", lastDone] })) : null, nextDue ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface", children: ["Next \u00B7 ", nextDue] })) : null] })) : null, showBook ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]", children: [price ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface", children: price })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: onBook, children: bookLabel })] })) : null] }));
});
//# sourceMappingURL=GroomingCardV4.js.map