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
exports.ServiceChecklistV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const job_v4_1 = require("./internal/job-v4");
/**
 * **V4 service checklist** — the web twin of the native `ServiceChecklistV4`,
 * same props as {@link ServiceChecklist} plus `emptyDescription`,
 * `requiredLabel` and `progressLabel`.
 *
 * ## Five changes
 *
 * 1. **Complete means complete.** The bar compared a *rounded* percentage
 *    against 100, and `clampPct` rounds — so 199 of 200 turned the bar
 *    "complete" green with an item still outstanding. `isComplete()` counts.
 * 2. **Requiredness is a word.** It was a red asterisk, which is invisible to
 *    a screen reader and to anyone who cannot separate it from the label's own
 *    punctuation. The word joins the checkbox's accessible name too.
 * 3. **The progress bar has a name.** It announced a bare percentage with
 *    nothing saying what was progressing.
 * 4. **The whole row toggles and clears 44.** The target was a 24px box on a
 *    surface used one-handed, outdoors, in gloves; the `<label>` now carries
 *    the row.
 * 5. **A checklist with no `onToggle` is not a wall of live checkboxes.** They
 *    were fully controlled, so they could be clicked forever and never change.
 */
exports.ServiceChecklistV4 = React.forwardRef(function ServiceChecklistV4({ title, tasks, onToggle, loading = false, disabled = false, emptyLabel = 'No checklist items', emptyDescription = 'Items will appear here once added.', requiredLabel = 'Required', progressLabel = 'Checklist progress', className, style, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const list = Array.isArray(tasks) ? tasks : [];
    const total = list.length;
    const completed = list.filter((task) => task.done).length;
    const done = (0, job_v4_1.isComplete)(completed, total);
    // A control nobody can move is disabled, not enabled-and-inert.
    const locked = disabled || onToggle == null;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: className, style: style, children: (0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-label": "Loading checklist", className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", width: "50%" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", lines: 3 })] }) }));
    }
    if (total === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ref: ref, title: emptyLabel, description: emptyDescription, className: className, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: className, style: style, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md", children: [title != null ? ((0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card", children: title })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold text-muted-text', job_v4_1.TABULAR_CLASS), children: [completed, "/", total] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-sm", children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: completed, max: total, tone: done ? 'success' : 'primary', size: "sm", "aria-label": progressLabel }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-md flex flex-col gap-xs", children: list.map((task) => ((0, jsx_runtime_1.jsxs)("label", { "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('flex cursor-pointer items-center gap-md rounded-[var(--xen-radius-md)] px-xs py-xs', chrome_v4_1.MIN_TAP_CLASS, locked && 'cursor-default'), children: [(0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: task.done, disabled: locked, onChange: (e) => onToggle?.(task.id, e.target.checked), "aria-label": (0, job_v4_1.spokenLine)([task.label, task.required ? requiredLabel : null]) }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-sm text-sm', task.done ? 'text-muted-text line-through' : 'text-on-card'), children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1", children: task.label }), task.required ? (
                                // A word, not a coloured asterisk — and `neutral`, because
                                // "this one is mandatory" is a fact about the task, not a
                                // state the technician has put it into.
                                (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", ...job_v4_1.BADGE_V4, children: requiredLabel })) : null] })] }, task.id))) })] }));
});
//# sourceMappingURL=ServiceChecklistV4.js.map