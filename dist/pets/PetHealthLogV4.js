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
exports.PetHealthLogV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const KIND_META = {
    symptom: { glyph: '🤒', label: 'Symptom', tone: 'danger' },
    observation: { glyph: '👀', label: 'Observation', tone: 'primary' },
    medication: { glyph: '💊', label: 'Medication', tone: 'accent' },
    diet: { glyph: '🍽️', label: 'Diet', tone: 'warn' },
    incident: { glyph: '⚠️', label: 'Incident', tone: 'danger' },
    note: { glyph: '📝', label: 'Note', tone: 'neutral' },
};
const CONTAINER = 'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md';
/**
 * PetHealthLog — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a pet-health log: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface) wrapping a list of entry rows. Each entry
 * is a soft-primary tinted well holding the kind glyph, a labelled kind Badge, the
 * text, and a muted timestamp. Kind is conveyed by glyph + labelled Badge (never
 * color alone). Preserves the `loading` skeleton and the shared {@link EmptyState}.
 * Same props/behavior as {@link PetHealthLogProps}. All colors from `--xen-*`
 * token classes (no literals).
 */
exports.PetHealthLogV4 = React.forwardRef(function PetHealthLogV4({ entries, title, loading = false, emptyLabel = 'No health entries yet', className }, ref) {
    const heading = title ? (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }) : null;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading health log", "aria-busy": "true", className: (0, cn_1.cn)(CONTAINER, className), children: [heading, [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-3.5 rounded-[var(--xen-radius-sm)] bg-border" }, i)))] }));
    }
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "aria-label": emptyLabel, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDCCB" }), title: title ?? 'Health log', description: emptyLabel, className: className }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(CONTAINER, className), children: [heading, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: entries.map((entry, i) => {
                    const meta = KIND_META[entry.kind] ?? KIND_META.note;
                    return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${meta.label}: ${entry.text}${entry.timestamp ? `, ${entry.timestamp}` : ''}`, className: "flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base", "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: (0, _tokens_1.toBadgeTone)(meta.tone), variant: "soft", children: meta.label }), entry.timestamp ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: entry.timestamp }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-xs)] text-sm text-on-surface", children: entry.text }), entry.author ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["\u2014 ", entry.author] }) : null] })] }, entry.id ?? i));
                }) })] }));
});
//# sourceMappingURL=PetHealthLogV4.js.map