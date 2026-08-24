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
exports.MedicationSchedule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * A daily medication schedule — the web mirror of the native
 * `MedicationSchedule`. A timeline of doses, each with its time, drug, dose
 * text, and a taken checkbox (`role="checkbox"`, keyboard-activatable). A
 * missed/overdue dose is flagged with a glyph + label + warn color, never color
 * alone. Renders loading and empty (`EmptyState`) states. Token-only colors.
 * Informational UI only — not a medical device.
 */
exports.MedicationSchedule = React.forwardRef(function MedicationSchedule({ doses, title, onToggleTaken, loading = false, emptyLabel = 'No medications scheduled', className, ...rest }, ref) {
    const header = title ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: title }) : null;
    let body;
    if (loading) {
        body = ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading schedule", "aria-busy": "true", className: "flex flex-col gap-[var(--xen-space-sm)]", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-[52px] rounded-[var(--xen-radius-md)] bg-neutral-100" }, i))) }));
    }
    else if (doses.length === 0) {
        body = (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { "data-xen-medication-empty": "", title: emptyLabel });
    }
    else {
        body = ((0, jsx_runtime_1.jsx)("div", { children: doses.map((d) => {
                const taken = d.taken ?? false;
                const missed = !taken && (d.missed ?? false);
                const interactive = !!onToggleTaken;
                const a11y = `${d.time}, ${d.name}${d.dose ? ` ${d.dose}` : ''}, ${taken ? 'taken' : missed ? 'missed' : 'not taken'}`;
                const toggle = interactive ? () => onToggleTaken?.(d.id, !taken) : undefined;
                return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-medication-dose": "", role: interactive ? 'checkbox' : undefined, "aria-checked": interactive ? taken : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: toggle, onKeyDown: interactive
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggle?.();
                            }
                        }
                        : undefined, className: (0, cn_1.cn)('flex min-h-[52px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80'), children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-[52px] justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: d.time }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', taken ? 'text-muted line-through' : 'text-on-surface'), children: [d.name, d.dose ? (0, jsx_runtime_1.jsxs)("span", { className: "font-medium text-muted", children: ["  ", d.dose] }) : null] }), missed ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold text-warn", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u26A0" }), "Missed"] })) : null] }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 text-xs font-bold', taken ? 'border-success bg-success text-on-success' : 'border-border bg-surface'), children: taken ? '✓' : '' })] }, d.id));
            }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-medication-schedule": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [header, body] }));
});
//# sourceMappingURL=MedicationSchedule.js.map