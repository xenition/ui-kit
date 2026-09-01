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
exports.MedicationScheduleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Checkbox_1 = require("../primitives/Checkbox");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
const STATUS_META = {
    taken: { glyph: '✓', label: 'Taken', tone: 'success' },
    missed: { glyph: '⚠', label: 'Missed', tone: 'warn' },
    pending: { glyph: '○', label: 'Pending', tone: 'muted' },
};
/**
 * MedicationSchedule — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a daily schedule: an elevated rounded card with a soft
 * shadow wrapping a timeline of doses. Each dose row shows a big legible
 * tabular-nums time, the drug + dose text, a labelled status marker (glyph +
 * label + token tone, never color alone), and a taken checkbox affordance
 * (`role="checkbox"`, keyboard-activatable, ≥44px tap target) wired to
 * `onToggleTaken`. A taken dose reads success glyph + "Taken" + a checked
 * control; a missed/overdue dose flags with a warn glyph + "Missed". Renders
 * loading and empty (`EmptyState`) states. Identical props/behavior to
 * {@link MedicationScheduleProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
exports.MedicationScheduleV4 = React.forwardRef(function MedicationScheduleV4({ doses, title, onToggleTaken, loading = false, emptyLabel = 'No medications scheduled', className, ...rest }, ref) {
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const header = title ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: title }) : null;
    let body;
    if (loading) {
        body = ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading schedule", "aria-busy": "true", className: "flex flex-col gap-[var(--xen-space-sm)]", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-[52px] rounded-[var(--xen-radius-md)] bg-neutral-100" }, i))) }));
    }
    else if (doses.length === 0) {
        body = (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { "data-xen-medication-empty": "", title: emptyLabel });
    }
    else {
        body = ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: doses.map((d) => {
                const taken = d.taken ?? false;
                const missed = !taken && (d.missed ?? false);
                const status = taken ? 'taken' : missed ? 'missed' : 'pending';
                const meta = STATUS_META[status];
                const interactive = !!onToggleTaken;
                const a11y = `${d.time}, ${d.name}${d.dose ? ` ${d.dose}` : ''}, ${meta.label}`;
                const toggle = interactive ? () => onToggleTaken?.(d.id, !taken) : undefined;
                return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-medication-dose": "", role: interactive ? 'checkbox' : undefined, "aria-checked": interactive ? taken : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: toggle, onKeyDown: interactive
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggle?.();
                            }
                        }
                        : undefined, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', taken ? 'bg-primary/10' : 'bg-transparent', interactive && 'cursor-pointer transition-opacity hover:opacity-80'), children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-[52px] shrink-0 justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold tabular-nums text-on-surface", children: d.time }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold', taken ? 'text-muted line-through' : 'text-on-surface'), children: [d.name, d.dose ? (0, jsx_runtime_1.jsxs)("span", { className: "font-medium text-muted", children: ["  ", d.dose] }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-bold', internal_1.TEXT_TONE[meta.tone]), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xs" }), meta.label] })] }), (0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { checked: taken, "aria-label": taken ? 'Mark as not taken' : 'Mark as taken', tabIndex: -1, className: "h-6 w-6", onChange: interactive ? (e) => onToggleTaken?.(d.id, e.target.checked) : undefined })] }, d.id));
            }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-medication-schedule": "", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className), ...rest, children: [header, body] }));
});
//# sourceMappingURL=MedicationScheduleV4.js.map