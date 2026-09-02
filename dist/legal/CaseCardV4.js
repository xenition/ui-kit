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
exports.CaseCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * CaseCard — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a matter file: an elevated rounded card with a
 * soft shadow, a docket-number eyebrow over a strong caption, the client, a
 * labelled glyph + word status pill (never color alone), and a soft-primary chip
 * strip carrying practice area + priority. `compact` trims to the header row;
 * `detailed` adds lead attorney + next event. An optional `onOpen` renders an
 * "Open case" affordance; when `onClick` is set the card is a keyboard-activable
 * `role="button"`. Reuses the base `variant` (`default` / `compact` / `detailed`).
 * All colors from `--xen-*` token classes (no literals).
 */
exports.CaseCardV4 = React.forwardRef(function CaseCardV4({ caseNumber, title, client, practiceArea, status, priority, leadAttorney, nextEvent, variant = 'default', loading = false, onClick, onOpen, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const detailed = variant === 'detailed';
    const closed = status === 'closed';
    const interactive = Boolean(onClick) && !loading;
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-case-card": "", "aria-label": "Loading case", "aria-busy": "true", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/3 rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-3/4 rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-case-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Case ${caseNumber}: ${title}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-md)]', compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]', closed && 'opacity-70', interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold uppercase tracking-wide tabular-nums text-muted", children: caseNumber }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: title }), client ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: client }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_STATUS_META[status], size: "sm" }) : null] }), !compact && (practiceArea || priority) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [practiceArea ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PRACTICE_AREA_META[practiceArea], variant: "soft", size: "sm" }) : null, priority ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_PRIORITY_META[priority], variant: "soft", size: "sm" }) : null] })) : null, detailed && (leadAttorney || nextEvent) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [leadAttorney ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Lead: ", leadAttorney] }) : null, nextEvent ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-on-surface", children: ["\u23ED ", nextEvent] }) : null] })) : null, onOpen ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Open case ${caseNumber}`, onClick: (e) => {
                    e.stopPropagation();
                    onOpen();
                }, className: "self-start rounded-[var(--xen-radius-md)] border border-border px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-xs font-bold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Open case" })) : null] }));
});
//# sourceMappingURL=CaseCardV4.js.map