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
exports.PetHealthLog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const _tokens_1 = require("./_tokens");
const KIND_META = {
    symptom: { glyph: '🤒', label: 'Symptom', slot: 'danger' },
    observation: { glyph: '👀', label: 'Observation', slot: 'primary' },
    medication: { glyph: '💊', label: 'Medication', slot: 'accent' },
    diet: { glyph: '🍽️', label: 'Diet', slot: 'warn' },
    incident: { glyph: '⚠️', label: 'Incident', slot: 'danger' },
    note: { glyph: '📝', label: 'Note', slot: 'muted' },
};
const CONTAINER = 'flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]';
/**
 * A timeline of pet-health log entries — each a kind icon, text, and timestamp
 * threaded on a connective rail. Handles a `loading` skeleton and an explicit
 * empty state (shared {@link EmptyState}). Kind is conveyed by icon + label text,
 * not color alone. Token-only colors.
 */
exports.PetHealthLog = React.forwardRef(function PetHealthLog({ entries, title, loading = false, emptyLabel = 'No health entries yet', className }, ref) {
    const heading = title ? (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }) : null;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading health log", "aria-busy": "true", className: (0, cn_1.cn)(CONTAINER, className), children: [heading, [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-3.5 rounded-[var(--xen-radius-sm)] bg-border" }, i)))] }));
    }
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "aria-label": emptyLabel, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDCCB" }), title: title ?? 'Health log', description: emptyLabel, className: className }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(CONTAINER, className), children: [heading, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-md)]", children: entries.map((entry, i) => {
                    const meta = KIND_META[entry.kind] ?? KIND_META.note;
                    const last = i === entries.length - 1;
                    return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${meta.label}: ${entry.text}${entry.timestamp ? `, ${entry.timestamp}` : ''}`, className: "flex gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-7 w-7 items-center justify-center rounded-full border text-sm', _tokens_1.SLOT_BORDER[meta.slot]), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }) }), !last ? (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 w-px flex-1 bg-border" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('min-w-0 flex-1', last ? '' : 'pb-[var(--xen-space-sm)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase', _tokens_1.SLOT_TEXT[meta.slot]), children: meta.label }), entry.timestamp ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: entry.timestamp }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: entry.text }), entry.author ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["\u2014 ", entry.author] }) : null] })] }, entry.id ?? i));
                }) })] }));
});
//# sourceMappingURL=PetHealthLog.js.map