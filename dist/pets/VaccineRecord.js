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
exports.VaccineRecord = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const STATUS_META = {
    current: { label: 'Up to date', tone: 'success', glyph: '✓', slot: 'success' },
    'due-soon': { label: 'Due soon', tone: 'warn', glyph: '⏳', slot: 'warn' },
    overdue: { label: 'Overdue', tone: 'danger', glyph: '⚠', slot: 'danger' },
    unknown: { label: 'No record', tone: 'neutral', glyph: '?', slot: 'muted' },
};
/**
 * A single immunization line item: vaccine name with a status chip
 * (`current`/`due-soon`/`overdue`), the administered + next-due dates, and an
 * optional "Book booster" action for anything not current. Status is conveyed by
 * a glyph + text label (never color alone). Token-only colors.
 */
exports.VaccineRecord = React.forwardRef(function VaccineRecord({ name, status, administered, nextDue, administeredBy, lotNumber, renewLabel = 'Book booster', onRenew, className }, ref) {
    const meta = STATUS_META[status];
    const showRenew = onRenew != null && status !== 'current';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${name} vaccine, ${meta.label}${nextDue ? `, next due ${nextDue}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] bg-surface text-on-surface border border-border border-l-4 rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]', _tokens_1.SLOT_BORDER_L[meta.slot], className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: `${meta.glyph} ${meta.label}` })] }), administered || nextDue ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xl)]", children: [administered ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Given" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: administered })] })) : null, nextDue ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Next due" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: nextDue })] })) : null] })) : null, administeredBy || lotNumber ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: [administeredBy, lotNumber ? `Lot ${lotNumber}` : null].filter(Boolean).join(' · ') })) : null, showRenew ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: status === 'overdue' ? 'danger' : 'outline', size: "sm", className: "self-start", onClick: onRenew, children: renewLabel })) : null] }));
});
//# sourceMappingURL=VaccineRecord.js.map