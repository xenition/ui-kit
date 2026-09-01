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
exports.MedicationReminderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const FORM_GLYPH = {
    pill: '💊',
    liquid: '🧪',
    injection: '💉',
    topical: '🧴',
    drops: '💧',
    chew: '🦴',
};
const STATE_META = {
    due: { label: 'Due now', tone: 'warn' },
    upcoming: { label: 'Upcoming', tone: 'primary' },
    taken: { label: 'Taken', tone: 'success' },
    missed: { label: 'Missed', tone: 'danger' },
};
/**
 * MedicationReminder — **V4** "companion" design (web parity of the native V4).
 * The warm, friendly take on a dose reminder: an elevated rounded card with a
 * soft shadow, the form glyph in a soft-primary tinted well, a bold title with
 * muted dose/frequency meta, a labelled state Badge, the next-dose time and
 * doses-left rendered as small soft-primary chips, and a rounded "Mark taken"
 * CTA. Same props/behavior as {@link MedicationReminderProps}; every `form` and
 * `state` reads via a glyph + labelled Badge/chip (never color alone). All colors
 * from `--xen-*` token classes (no literals). The `onMarkTaken` action is
 * preserved as a real `<button>` that stops propagation so it stays independent
 * of any wrapping click target.
 */
exports.MedicationReminderV4 = React.forwardRef(function MedicationReminderV4({ name, dosage, form = 'pill', frequency, nextDose, state, dosesLeft, markLabel = 'Mark taken', onMarkTaken, className, variant = 'card' }, ref) {
    const stateMeta = STATE_META[state];
    const showMark = onMarkTaken != null && state !== 'taken';
    const title = [name, dosage].filter(Boolean).join(' · ');
    // ── compact ───────────────────────────────────────────────────────────────
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-sm)] shadow-md', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg", children: FORM_GLYPH[form] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: name }), dosage ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: dosage }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(stateMeta.tone), variant: "soft", children: stateMeta.label }), showMark ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${markLabel}: ${name}`, onClick: (e) => {
                        e.stopPropagation();
                        onMarkTaken?.();
                    }, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border border-primary bg-primary/10 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: "\u2713" })) : null] }));
    }
    // ── card (default) ──────────────────────────────────────────────────────────
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl", children: FORM_GLYPH[form] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title }), frequency ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: frequency }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(stateMeta.tone), variant: "soft", children: stateMeta.label })] }), nextDose || dosesLeft != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [nextDose ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-semibold text-on-surface", children: ["\u23F0 ", nextDose] })) : null, dosesLeft != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-on-surface", children: [dosesLeft, " dose", dosesLeft === 1 ? '' : 's', " left"] })) : null] })) : null, showMark ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${markLabel}: ${name}`, onClick: (e) => {
                    e.stopPropagation();
                    onMarkTaken?.();
                }, className: "inline-flex min-h-[44px] self-start items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: ["\u2713 ", markLabel] })) : null] }));
});
//# sourceMappingURL=MedicationReminderV4.js.map