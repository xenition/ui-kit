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
exports.VaccineRecordV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const STATUS_META = {
    current: { label: 'Up to date', tone: 'success', glyph: '✓' },
    'due-soon': { label: 'Due soon', tone: 'warn', glyph: '⏳' },
    overdue: { label: 'Overdue', tone: 'danger', glyph: '⚠' },
    unknown: { label: 'No record', tone: 'neutral', glyph: '?' },
};
/**
 * VaccineRecord — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on an immunization line item: an elevated rounded card with
 * a soft shadow, the status glyph in a soft-primary tinted well, a bold vaccine
 * name, a labelled status Badge, the given/next-due dates and vet/lot meta shown
 * as small soft-primary chips, and a rounded "Book booster" CTA for anything not
 * current. Same props/behavior as {@link VaccineRecordProps}; every `status`
 * reads via a glyph + labelled Badge (never color alone). All colors from
 * `--xen-*` token classes (no literals).
 */
exports.VaccineRecordV4 = React.forwardRef(function VaccineRecordV4({ name, status, administered, nextDue, administeredBy, lotNumber, renewLabel = 'Book booster', onRenew, className }, ref) {
    const meta = STATUS_META[status];
    const showRenew = onRenew != null && status !== 'current';
    const footer = [administeredBy, lotNumber ? `Lot ${lotNumber}` : null].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${name} vaccine, ${meta.label}${nextDue ? `, next due ${nextDue}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl", children: meta.glyph }), (0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(meta.tone), variant: "soft", children: `${meta.glyph} ${meta.label}` })] }), administered || nextDue ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [administered ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-semibold text-on-surface", children: ["Given \u00B7 ", administered] })) : null, nextDue ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-semibold text-on-surface", children: ["Next due \u00B7 ", nextDue] })) : null] })) : null, footer ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: footer }) : null, showRenew ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: status === 'overdue' ? 'danger' : 'outline', size: "sm", className: "self-start", onClick: onRenew, children: renewLabel })) : null] }));
});
//# sourceMappingURL=VaccineRecordV4.js.map