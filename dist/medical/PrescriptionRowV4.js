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
exports.PrescriptionRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const STATUS_META = {
    active: { glyph: '●', label: 'Active', tone: 'success' },
    'refill-due': { glyph: '↻', label: 'Refill due', tone: 'warn' },
    paused: { glyph: '⏸', label: 'Paused', tone: 'muted' },
    expired: { glyph: '✕', label: 'Expired', tone: 'danger' },
};
/** MedicalTone → BadgeTone (identical members). */
const BADGE_TONE = {
    primary: 'primary',
    muted: 'muted',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
    accent: 'accent',
};
/**
 * PrescriptionRow — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a medication row: an elevated rounded row with a soft
 * shadow, a pill glyph, the drug name, dose · directions · refills, and a status
 * marker (active / refill-due / paused / expired) drawn as a glyph + labelled
 * Badge + token tone, so it never relies on color alone (accessibility + the
 * token contract). A "Refill" action surfaces when a refill is due. Honors the
 * V4 `variant` — `full` (default) and `compact` (a denser single line that hides
 * the secondary detail line) — identical props/behavior to
 * {@link PrescriptionRowProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
exports.PrescriptionRowV4 = React.forwardRef(function PrescriptionRowV4({ name, dose, frequency, refillsLeft, status = 'active', onRefill, onClick, variant = 'full', className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.active;
    const interactive = !!onClick;
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const detailParts = [
        dose,
        frequency,
        refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
    ].filter(Boolean);
    const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;
    const commonProps = {
        ref,
        'data-xen-prescription-row': '',
        role: interactive ? 'button' : undefined,
        tabIndex: interactive ? 0 : undefined,
        'aria-label': a11y,
        onClick: interactive ? () => onClick?.() : undefined,
        onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined,
    };
    const statusBadge = ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: BADGE_TONE[meta.tone], variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] }));
    const refillBtn = status === 'refill-due' && onRefill ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "secondary", onClick: (e) => {
            e.stopPropagation();
            onRefill();
        }, children: "Refill" })) : null;
    // ── compact: denser single line ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ...commonProps, className: (0, cn_1.cn)(shell, 'flex min-h-[44px] items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer transition-opacity hover:opacity-80', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC8A", size: "base" }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: name }), dose ? (0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap text-xs text-muted", children: dose }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "ml-auto flex items-center gap-[var(--xen-space-sm)]", children: [statusBadge, refillBtn] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ...commonProps, className: (0, cn_1.cn)(shell, 'flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer transition-opacity hover:opacity-80', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC8A", size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name }), detailParts.length ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex w-fit items-center rounded-[var(--xen-radius-sm)] bg-primary/10 px-[var(--xen-space-xs)] text-sm text-muted", children: detailParts.join('  ·  ') })) : null, statusBadge] }), refillBtn] }));
});
//# sourceMappingURL=PrescriptionRowV4.js.map