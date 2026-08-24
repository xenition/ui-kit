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
exports.GroomingCard = void 0;
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
    scheduled: { label: 'Scheduled', tone: 'primary', slot: 'primary' },
    due: { label: 'Due', tone: 'warn', slot: 'warn' },
    overdue: { label: 'Overdue', tone: 'danger', slot: 'danger' },
    done: { label: 'Done', tone: 'success', slot: 'success' },
};
/**
 * A grooming service card: service icon + name, a status chip, the last-done and
 * next-due dates, optional groomer + price, and a "Book" action for anything not
 * yet done. Status reads via a labelled chip + left accent bar (never color
 * alone). Token-only colors.
 */
exports.GroomingCard = React.forwardRef(function GroomingCard({ service, status, groomer, lastDone, nextDue, price, bookLabel = 'Book', onBook, className }, ref) {
    const meta = SERVICE_META[service];
    const statusMeta = STATUS_META[status];
    const showBook = onBook != null && status !== 'done';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label}, ${statusMeta.label}${nextDue ? `, next due ${nextDue}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border border-l-4 rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', _tokens_1.SLOT_BORDER_L[statusMeta.slot], className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: meta.label }), groomer ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: groomer }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, children: statusMeta.label })] }), lastDone || nextDue ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xl)]", children: [lastDone ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Last" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: lastDone })] })) : null, nextDue ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Next" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: nextDue })] })) : null] })) : null, showBook ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [price ? (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: price }) : (0, jsx_runtime_1.jsx)("span", {}), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: onBook, children: bookLabel })] })) : null] }));
});
//# sourceMappingURL=GroomingCard.js.map