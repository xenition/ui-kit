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
exports.WorkOrderCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const job_v4_1 = require("./internal/job-v4");
const STATUS_V4 = {
    open: { label: 'Open', glyph: '○', tone: 'neutral' },
    'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary' },
    'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};
/**
 * Priority → word and glyph, all on one neutral chip.
 *
 * A priority is **identity**, not status: it says what kind of job this is, not
 * how the job is going. The base spent `warn` on "High" and `danger` on
 * "Emergency", which put a work order that is running perfectly well under the
 * same red the module uses for a failed safety checkpoint — and on a card that
 * already carries a status pill, two coloured pills side by side stop meaning
 * two different things. The rank is carried by the arrow and the word.
 */
const PRIORITY_V4 = {
    low: { label: 'Low', glyph: '↓' },
    medium: { label: 'Medium', glyph: '=' },
    high: { label: 'High', glyph: '↑' },
    emergency: { label: 'Emergency', glyph: '!' },
};
/**
 * **V4 work-order card** — the web twin of the native `WorkOrderCardV4`, same
 * props as {@link WorkOrderCard} plus `priorityLabels`, `statusLabels` and
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card's name carries the job, not just its number.** `` `Work order
 *    ${n}, ${title}, ${status}` `` replaced the whole subtree, so a technician
 *    heard "Open" and never "Emergency" — and never the site, the assignee or
 *    the schedule either.
 * 2. **An interactive card is a real `<button>`.** It was a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler:
 *    three approximations of what a button already does, and the shape that
 *    breaks the moment a control is nested inside it.
 * 3. **Priority stops wearing a status colour** — see {@link PRIORITY_V4}.
 * 4. **The leading disc is decorative.** It announced "Work order" before the
 *    card said which one.
 * 5. **The skeleton is an opaque mix and the busy region is named**, and the
 *    press feedback is a state layer rather than a shadow that grows.
 */
exports.WorkOrderCardV4 = React.forwardRef(function WorkOrderCardV4({ workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph = '🔧', loading = false, onClick, priorityLabels, statusLabels, loadingLabel = 'Loading work order', className, style, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: className, style: style, children: (0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-label": loadingLabel, className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0', job_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-[var(--xen-text-sm)] w-[70%]', job_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-[var(--xen-text-xs)] w-[40%]', job_v4_1.PLACEHOLDER_CLASS) })] })] }) }));
    }
    const sd = STATUS_V4[status] ?? STATUS_V4.open;
    const statusWord = statusLabels?.[status] ?? sd.label;
    const pd = priority ? PRIORITY_V4[priority] : undefined;
    const priorityWord = priority ? (priorityLabels?.[priority] ?? pd?.label) : undefined;
    const hasMeta = assignee != null || site != null || scheduledFor != null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]", style: { background: (0, job_v4_1.discGround)('primary') }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 font-heading text-lg font-bold text-on-card", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: workOrderNumber })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...job_v4_1.BADGE_V4, children: `${sd.glyph} ${statusWord}` }), pd ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", ...job_v4_1.BADGE_V4, children: `${pd.glyph} ${priorityWord}` })) : null] })] }), hasMeta ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex flex-col gap-xs border-t border-border pt-md", children: [site != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: ["\uD83D\uDCCD ", site] }) : null, assignee != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: ["\uD83D\uDC77 ", assignee] })) : null, scheduledFor != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: ["\uD83D\uDD51 ", scheduledFor] })) : null] })) : null] }));
    if (onClick == null) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: className, style: style, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, padding: "none", className: className, style: style, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, job_v4_1.spokenLine)([
                workOrderNumber,
                title,
                statusWord,
                priorityWord,
                site,
                assignee,
                scheduledFor,
            ]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=WorkOrderCardV4.js.map