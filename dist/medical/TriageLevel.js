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
exports.TriageLevel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const LEVEL_META = {
    1: { label: 'Immediate', glyph: '⚠', tone: 'danger', hint: 'Life-threatening — resuscitate now' },
    2: { label: 'Emergent', glyph: '▲', tone: 'danger', hint: 'High risk — see within minutes' },
    3: { label: 'Urgent', glyph: '◆', tone: 'warn', hint: 'Needs prompt evaluation' },
    4: { label: 'Less urgent', glyph: '●', tone: 'primary', hint: 'Can wait — routine care' },
    5: { label: 'Non-urgent', glyph: '○', tone: 'success', hint: 'Minor — lowest priority' },
};
function clampLevel(n) {
    const r = Math.round(n);
    const c = r < 1 ? 1 : r > 5 ? 5 : r;
    return c;
}
/**
 * A triage acuity indicator (1 = immediate … 5 = non-urgent) — the web mirror
 * of the native `TriageLevel`. The level is always conveyed by the number + a
 * text label + a glyph, so severity never relies on the color fill alone (the
 * token color is a supporting cue only). Renders a full card with a guidance
 * hint, or a `compact` chip. Token-only colors. Informational UI only — not a
 * medical device.
 */
exports.TriageLevel = React.forwardRef(function TriageLevel({ level, label, description, compact = false, className, ...rest }, ref) {
    const safe = clampLevel(level);
    const meta = LEVEL_META[safe];
    const toneClass = internal_1.TEXT_TONE[meta.tone];
    const text = label ?? meta.label;
    const hint = description ?? meta.hint;
    const a11y = `Triage level ${safe}, ${text}. ${hint}`;
    if (compact) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-triage-level": "", "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full bg-neutral-100 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', toneClass), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', toneClass), children: [safe, " \u00B7 ", text] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-triage-level": "", "aria-label": a11y, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-extrabold', toneClass), children: safe }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', toneClass), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', toneClass), children: text })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: hint })] })] }));
});
//# sourceMappingURL=TriageLevel.js.map