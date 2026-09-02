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
exports.ProgressTrackerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
/**
 * ProgressTracker — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded card with a soft shadow holding a course-completion summary
 * (a bar or a circular ring) with a big legible **tabular-nums** percentage, and
 * an optional per-step checklist. Completion is counted from each `step.completed`
 * flag and guarded against an empty list, which renders a muted empty state.
 * Reuses the base `variant` (`bar` / `ring`). Identical props/behavior to
 * {@link ProgressTrackerProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
exports.ProgressTrackerV4 = React.forwardRef(function ProgressTrackerV4({ steps, variant = 'bar', title = 'Your progress', emptyLabel = 'No modules yet', showList = false, className, ...rest }, ref) {
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]';
    if (steps.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-progress-tracker": "", "aria-label": emptyLabel, className: (0, cn_1.cn)(shell, className), ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel }) }));
    }
    const done = steps.filter((s) => s.completed).length;
    const pct = Math.round((done / steps.length) * 100);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-progress-tracker": "", "aria-label": `${title}: ${done} of ${steps.length} complete, ${pct}%`, className: (0, cn_1.cn)('flex flex-col gap-3', shell, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "text-lg font-bold tabular-nums text-primary", children: [pct, "%"] })] }), variant === 'ring' ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: done, max: steps.length, size: 100, color: "primary" }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: done, max: steps.length, tone: "primary" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: [done, " of ", steps.length, " complete (", pct, "%)"] })] })), showList ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-1", children: steps.map((step) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-5 w-5 items-center justify-center rounded-full text-xs', step.completed ? 'bg-success/10 text-success' : 'bg-neutral-100 text-muted'), children: step.completed ? '✓' : '○' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 truncate text-sm', step.completed ? 'text-on-surface' : 'text-muted'), children: step.label })] }, step.id))) })) : null] }));
});
//# sourceMappingURL=ProgressTrackerV4.js.map