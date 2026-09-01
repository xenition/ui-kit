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
exports.PatientCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const STATUS_META = {
    stable: { label: 'Stable', tone: 'success', glyph: '●' },
    observation: { label: 'Observation', tone: 'warn', glyph: '◐' },
    critical: { label: 'Critical', tone: 'danger', glyph: '⚠' },
    discharged: { label: 'Discharged', tone: 'neutral', glyph: '✓' },
};
/**
 * PatientCard — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a patient roster / chart-header row: an elevated rounded card
 * with a soft shadow, the avatar + name + an age·sex·MRN demographic line, an
 * optional room, and a labelled clinical-status badge whose meaning is carried
 * by a glyph + label as well as tone (never color alone). When `onClick` is set
 * the card is a keyboard-activatable `role="button"`. Honors the V4 `variant` —
 * `full` (card, default) and `compact` (a dense single row) — identical
 * props/behavior to {@link PatientCardProps}. All colors from `--xen-*` token
 * classes (no literals). Informational UI only — not a medical device.
 */
exports.PatientCardV4 = React.forwardRef(function PatientCardV4({ name, avatar, age, sex, mrn, status, room, onClick, variant = 'full', className, ...rest }, ref) {
    const meta = status ? STATUS_META[status] : undefined;
    const interactive = !!onClick;
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const demo = [age != null ? `${age}y` : undefined, sex, mrn ? `MRN ${mrn}` : undefined].filter(Boolean);
    const a11y = `${name}${demo.length ? `, ${demo.join(', ')}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const interactiveProps = interactive
        ? {
            role: 'button',
            tabIndex: 0,
            onClick: () => onClick?.(),
            onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            },
        }
        : {};
    // ── compact: dense single row ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-patient-card": "", "aria-label": a11y, ...interactiveProps, className: (0, cn_1.cn)(shell, 'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]', interactive && 'cursor-pointer transition-opacity hover:opacity-90', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: name }), demo.length ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs tabular-nums text-muted", children: demo.join('  ·  ') }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-patient-card": "", "aria-label": a11y, ...interactiveProps, className: (0, cn_1.cn)(shell, 'flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', interactive && 'cursor-pointer transition-opacity hover:opacity-90', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatar, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), demo.length ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm tabular-nums text-muted", children: demo.join('  ·  ') }) : null, room ? ((0, jsx_runtime_1.jsxs)("span", { className: "mt-0.5 inline-flex w-fit items-center gap-1 truncate rounded-[var(--xen-radius-sm)] bg-primary/10 px-[var(--xen-space-xs)] text-xs text-muted", children: ["\uD83D\uDECF ", room] })) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })) : null] }));
});
//# sourceMappingURL=PatientCardV4.js.map