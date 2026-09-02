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
exports.JobListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("./internal/tone-v4");
/** An empty job list still owes the reader a next step. */
const EMPTY_DESCRIPTION = 'Try removing a filter or widening your search.';
/**
 * **V4 job list** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * Every one of the twelve components in this module presupposes a list it sits
 * in, and the module never shipped one. `JobCard`, `SavedJobRow`,
 * `ApplicationRow` and `RecruiterMessage` are all rows in a list that does not
 * exist — so every screen built out of them had to invent its own answers to
 * the three questions a list always asks, and `JobFilterBar`'s `resultCount`
 * was the module's only acknowledgement that any of them had an answer:
 *
 * 1. **What does nothing look like?** A job search that matched nothing is the
 *    single most common state in a job board and the one worth designing. A
 *    real empty state with a headline and a next-step sentence — not a silent
 *    blank region below a filter bar the user has just over-narrowed.
 * 2. **What does loading look like?** Placeholder cards in the shape the cards
 *    are about to be, so the list does not collapse to a spinner and then jump
 *    to full height under the reader's cursor. The placeholders are an opaque
 *    mix against the card, never `bg-neutral-100` — which is what `JobCard`'s
 *    own skeleton used, and which mirrors into a near-white slab on a dark
 *    seed.
 * 3. **How many are there?** That count is the reason a job seeker looks at
 *    the screen at all. It names the list for a screen reader and is drawn
 *    beside the heading for everyone else — `aria-hidden` there, because the
 *    list below already carries it: one fact, announced once.
 *
 * The rows are `<li>`s inside a `<ul>`, so a reader is told how many there are
 * before deciding whether to walk them, and can skip the list wholesale. Rows
 * are passed as children rather than as data, because the four things that go
 * in this list take four different records — that is the same contract
 * `ApprovalQueueV4` uses in `hr`.
 */
exports.JobListV4 = React.forwardRef(function JobListV4({ title, children, loading = false, skeletonRows = 3, formatCount, emptyLabel = 'No jobs found', emptyDescription = EMPTY_DESCRIPTION, loadingLabel = 'Loading jobs', testID, className, ...rest }, ref) {
    const rows = React.Children.toArray(children).filter(Boolean);
    const countText = (formatCount ?? ((n) => `${n} job${n === 1 ? '' : 's'}`))(rows.length);
    // Only claim a number once there is one: a count over placeholders is a
    // guess, and an empty list's own state already says there is nothing here.
    const showCount = !loading && rows.length > 0;
    const heading = title ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("h2", { className: "min-w-0 truncate text-sm font-bold text-on-surface", children: title }), showCount ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0 text-xs text-muted-text', tone_v4_1.TABULAR_CLASS), children: countText })) : null] })) : null;
    if (loading) {
        const placeholders = Math.max(1, Math.floor(skeletonRows));
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-v4-job-list": "loading", role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [heading, Array.from({ length: placeholders }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-card p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { style: { borderRadius: 'var(--xen-radius-md)' }, className: (0, cn_1.cn)('h-xl w-xl shrink-0', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-[55%]', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[35%]', tone_v4_1.PLACEHOLDER_CLASS) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[45%]', tone_v4_1.PLACEHOLDER_CLASS) })] }, index)))] }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-v4-job-list": "empty", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [heading, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, "data-xen-v4-job-list": "", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [heading, (0, jsx_runtime_1.jsx)("ul", { "aria-label": countText, className: "flex flex-col gap-sm", children: rows.map((row, index) => ((0, jsx_runtime_1.jsx)("li", { children: row }, index))) })] }));
});
//# sourceMappingURL=JobListV4.js.map