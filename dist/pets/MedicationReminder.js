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
exports.MedicationReminder = void 0;
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
    due: { label: 'Due now', tone: 'warn', slot: 'warn' },
    upcoming: { label: 'Upcoming', tone: 'primary', slot: 'primary' },
    taken: { label: 'Taken', tone: 'success', slot: 'success' },
    missed: { label: 'Missed', tone: 'danger', slot: 'danger' },
};
/**
 * A medication dose reminder: form icon, name + dosage, frequency, the next-dose
 * time, and a state chip. Actionable states (`due`/`upcoming`/`missed`) expose a
 * real "Mark taken" `<button>`. State reads via a labelled chip + left accent
 * (never color alone). Token-only colors.
 */
exports.MedicationReminder = React.forwardRef(function MedicationReminder({ name, dosage, form = 'pill', frequency, nextDose, state, dosesLeft, markLabel = 'Mark taken', onMarkTaken, className }, ref) {
    const stateMeta = STATE_META[state];
    const showMark = onMarkTaken != null && state !== 'taken';
    const title = [name, dosage].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] bg-surface text-on-surface border border-border border-l-4 rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)]', _tokens_1.SLOT_BORDER_L[stateMeta.slot], className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": "true", children: FORM_GLYPH[form] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title }), frequency ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: frequency }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: stateMeta.tone, children: stateMeta.label })] }), nextDose || dosesLeft != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [nextDose ? (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-on-surface", children: ["\u23F0 ", nextDose] }) : (0, jsx_runtime_1.jsx)("span", {}), dosesLeft != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [dosesLeft, " dose", dosesLeft === 1 ? '' : 's', " left"] })) : null] })) : null, showMark ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${markLabel}: ${name}`, onClick: onMarkTaken, className: (0, cn_1.cn)('inline-flex self-start items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border bg-transparent px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold', _tokens_1.SLOT_BORDER[stateMeta.slot], _tokens_1.SLOT_TEXT[stateMeta.slot]), children: ["\u2713 ", markLabel] })) : null] }));
});
//# sourceMappingURL=MedicationReminder.js.map