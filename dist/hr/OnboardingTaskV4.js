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
exports.OnboardingTaskV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/**
 * **V4 onboarding task** — the web twin of the native `OnboardingTaskV4`, same
 * props as {@link OnboardingTask} plus `blockedReason`, `overdueLabel` and
 * `testID`.
 *
 * ## Five changes
 *
 * 1. **The checkbox is a 44 target.** It was a bare 16px `<input>` with a
 *    `pt-0.5` wrapper — a quarter of the area a thumb needs, on the one
 *    control the whole component exists for. It now sits in a 44 square that
 *    is itself the label, so the miss lands on the tick rather than on
 *    nothing. On native the same `Checkbox` was nested *inside* the row's
 *    `Pressable`, which flattened the row to one leaf and made the tick
 *    unreachable to VoiceOver; this twin already kept it out, and both now
 *    match.
 * 2. **A blocked task can say why.** See `blockedReason`.
 * 3. **The title carries the whole task's name.** The title button announced
 *    only the title, so the status, the due date and the word "Overdue" — the
 *    three things that decide whether the reader acts today — were separate
 *    stops or, in browse mode, easy to miss entirely.
 * 4. **"Overdue" is a prop and is inked with an ink slot.** It was a hard-coded
 *    English string drawn in `text-danger`, the **fill** token; `danger-text`
 *    is the slot with the contrast promise.
 * 5. **The assignee avatar is the same size on both twins** (`xs`, matching
 *    the `xs` caption beside it); web drew `sm` and native drew `xs`.
 */
exports.OnboardingTaskV4 = React.forwardRef(function OnboardingTaskV4({ title, category, status = 'todo', dueDate, overdue = false, assignee, assigneeAvatarUrl, variant = 'default', onToggle, onClick, blockedReason, overdueLabel = 'Overdue', testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    // A checklist item with no title is a tick beside nothing.
    if (!title)
        return null;
    const compact = variant === 'compact';
    const done = status === 'done';
    const statusMeta = internal_1.TASK_STATUS_META[status];
    const meta = (0, tone_v4_1.metaLine)([category, dueDate ? `Due ${dueDate}` : null]);
    const isOverdue = overdue && !done;
    const reason = status === 'blocked' ? blockedReason : undefined;
    const titleClasses = (0, cn_1.cn)('text-left text-sm font-semibold', done ? 'text-muted-text line-through' : 'text-on-card');
    const spoken = (0, tone_v4_1.spokenLine)([
        title,
        statusMeta.label,
        meta,
        isOverdue ? overdueLabel : undefined,
        reason,
        assignee,
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex items-start gap-sm rounded-[var(--xen-radius-md)] border border-border bg-card px-md py-sm', className), children: [(0, jsx_runtime_1.jsx)("label", { className: (0, cn_1.cn)('flex shrink-0 cursor-pointer items-center justify-center rounded-[var(--xen-radius-md)]', tone_v4_1.MIN_TAP_SQUARE_CLASS), children: (0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: done, onChange: (e) => onToggle?.(e.target.checked), "aria-label": `${done ? 'Mark incomplete' : 'Mark complete'}: ${title}` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": spoken, onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)(titleClasses, 'flex w-full items-center truncate rounded-[var(--xen-radius-md)]', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: title })) : ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)(titleClasses, 'line-clamp-2'), children: title })), !compact && meta ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted-text", children: meta })) : null, reason ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-danger-text", children: reason })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", "aria-hidden": onClick ? true : undefined }), isOverdue ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', (0, tone_v4_1.toneInkClass)('danger')), "aria-hidden": onClick ? true : undefined, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u26A0 " }), overdueLabel] })) : null, !compact && assignee ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", "aria-hidden": onClick ? true : undefined, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "xs", name: assignee, src: assigneeAvatarUrl, alt: "" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: assignee })] })) : null] })] })] }));
});
//# sourceMappingURL=OnboardingTaskV4.js.map