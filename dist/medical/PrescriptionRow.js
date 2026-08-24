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
exports.PrescriptionRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
const STATUS_META = {
    active: { glyph: '●', label: 'Active', tone: 'success' },
    'refill-due': { glyph: '↻', label: 'Refill due', tone: 'warn' },
    paused: { glyph: '⏸', label: 'Paused', tone: 'muted' },
    expired: { glyph: '✕', label: 'Expired', tone: 'danger' },
};
/**
 * A medication list row for a prescription / pharmacy screen — the web mirror
 * of the native `PrescriptionRow`. Shows the drug name, dose, directions,
 * refills remaining, and a status marker (active / refill-due / paused /
 * expired) drawn as a glyph + label + token color so it never relies on color
 * alone. A "Refill" action surfaces when a refill is due. When `onClick` is set
 * the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
exports.PrescriptionRow = React.forwardRef(function PrescriptionRow({ name, dose, frequency, refillsLeft, status = 'active', onRefill, onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.active;
    const toneClass = internal_1.TEXT_TONE[meta.tone];
    const interactive = !!onClick;
    const detailParts = [
        dose,
        frequency,
        refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
    ].filter(Boolean);
    const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-prescription-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC8A", size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name }), detailParts.length ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: detailParts.join('  ·  ') })) : null, (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold', toneClass), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })] }), status === 'refill-due' && onRefill ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "secondary", onClick: (e) => {
                    e.stopPropagation();
                    onRefill();
                }, children: "Refill" })) : null] }));
});
//# sourceMappingURL=PrescriptionRow.js.map