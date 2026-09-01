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
exports.NextStepRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * Priority glyph + default word. The same three the base carried; only the
 * words are now overridable.
 */
const PRIORITY_META_V4 = {
    low: { glyph: '↓', label: 'Low' },
    normal: { glyph: '•', label: 'Normal' },
    high: { glyph: '↑', label: 'High' },
};
/**
 * **V4 next-step row** — the web twin of the native `NextStepRowV4`, same props
 * as {@link NextStepRow} plus `priorityLabels`, `overdueLabel`, `completeLabel`
 * and `completedLabel`.
 *
 * ## Six changes
 *
 * 1. **The whole meta row is announced.** `aria-label={title}` replaced the
 *    subtree, so "⚠ Overdue · Mar 4" — the single reason a next-step row exists
 *    — was silent. This is the sharpest case of the defect in the module.
 * 2. **The checkbox clears 44.** It was a 22px square, and it is the row's
 *    *primary* action.
 * 3. **No dead checkbox.** With no `onToggle` the base still rendered a normal,
 *    apparently-tappable checkbox that silently did nothing. Without a handler
 *    the row draws a static mark instead, and the state goes into the name.
 * 4. **A checked box fills `primary`, not `success`.** Ticking a task is a
 *    *selection*; `success` has to keep meaning that something went well.
 * 5. **The `<button>` holds phrasing content only.** It had a `<p>` and a
 *    `<div>` inside it, which is invalid and which browsers repair
 *    unpredictably.
 * 6. **A press is the M3 state layer**, mixed against the pair the control
 *    actually wears — `on-primary` over `primary` for a checked box — rather
 *    than an opacity that would read as unavailable.
 */
exports.NextStepRowV4 = React.forwardRef(function NextStepRowV4({ title, dueDate, overdue = false, done = false, assignee, priority, priorityLabels, overdueLabel = 'Overdue', completeLabel = 'Mark complete', completedLabel = 'Completed', onToggle, onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!title)
        return null;
    const prio = priority ? PRIORITY_META_V4[priority] : undefined;
    const prioLabel = priority ? (priorityLabels?.[priority] ?? prio.label) : undefined;
    const stateWord = done ? completedLabel : completeLabel;
    const label = (0, crm_v4_1.spokenLine)([
        title,
        prioLabel,
        assignee,
        overdue && !done ? overdueLabel : undefined,
        dueDate,
        done ? completedLabel : undefined,
    ]);
    const mark = done ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-black", children: "\u2713" })) : null;
    const boxClass = (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2', nav_v4_1.MIN_TAP_SQUARE_CLASS, 
    // A checked box is a selection, not a status.
    done ? 'border-primary bg-primary text-on-primary' : 'border-border bg-transparent');
    const meta = ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-xs", children: [prio ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: `${prio.glyph} ${prioLabel}` })) : null, assignee ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: assignee }) : null, overdue && !done ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', (0, crm_v4_1.toneInkClass)('danger')), children: `⚠ ${(0, crm_v4_1.metaLine)([overdueLabel, dueDate])}` })) : dueDate ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: dueDate })) : null] }));
    const titleSpan = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', done ? 'text-muted-text line-through' : 'text-on-surface'), children: title }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full items-center gap-sm py-sm', className), ...rest, children: [onToggle ? ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "checkbox", "aria-checked": done, "aria-label": `${stateWord}: ${title}`, onClick: () => onToggle(!done), "data-xen-v4-state": "", style: 
                // The box's own pair: a checked box is filled `primary`, so its
                // layer is `on-primary` over `primary`, not over the page.
                (0, v4_state_1.stateGroundVars)(done ? 'var(--xen-primary)' : 'var(--xen-surface)', done ? 'var(--xen-on-primary)' : 'var(--xen-on-surface)'), className: (0, cn_1.cn)(boxClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: mark })) : (
            /*
              No handler, so no control: a box that looks tappable and does
              nothing is worse than a mark that never claimed to be one. The state
              still reaches the reader, through the row's own name.
            */
            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: boxClass, children: mark })), onClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col gap-xs rounded-[var(--xen-radius-md)] px-xs text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: [titleSpan, meta] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs px-xs", children: [!onToggle ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: stateWord }) : null, titleSpan, meta] }))] }));
});
//# sourceMappingURL=NextStepRowV4.js.map