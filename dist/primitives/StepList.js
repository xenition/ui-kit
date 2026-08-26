"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepList = StepList;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const Text_1 = require("./Text");
/**
 * Vertical, content-bearing instruction list — a recipe method, an onboarding
 * checklist body, a setup guide. Numbered markers down the left, joined by a
 * rail, each carrying a title and as much body copy as the step needs.
 *
 * **Not to be confused with its sibling {@link Steps}, and the difference is
 * the whole reason this exists.** `Steps` is a *progress indicator*: one
 * `flex-1` marker per step laid out horizontally, correct for a 3-step checkout
 * where the titles are one word each. Hand it eight recipe steps and every
 * title collapses to nothing — a real app hit exactly that and ended up
 * rendering its method as list rows beside a title-less `Steps`.
 *
 * So: **`Steps` for "where am I in this flow", `StepList` for "here are the
 * instructions".** `StepList` grows downward, so it reads the same at eight
 * items as at three, and it is the only one of the two with room for a body.
 *
 * The native twin takes `onStepPress` — the one idiomatic swap. Every color
 * traces to a token; no literal colors.
 */
function StepList({ steps, current, onStepClick, connector = true, className, }) {
    return ((0, jsx_runtime_1.jsx)("ol", { className: (0, cn_1.cn)('flex flex-col', className), children: steps.map((step, i) => {
            const last = i === steps.length - 1;
            // `current` is optional: with no current step nothing is "done" and
            // nothing is "active" — it renders as a plain numbered list.
            const done = step.done === true || (current != null && i < current);
            const active = step.done !== true && current != null && i === current;
            const numberTone = done ? 'onPrimary' : active ? 'primaryText' : 'muted';
            const body = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex gap-md', last ? 'pb-0' : 'pb-lg'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', done ? 'bg-primary' : active ? 'border-2 border-primary' : 'border-2 border-border'), children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", weight: "semibold", tone: numberTone, children: done ? '✓' : String(i + 1) }) }), connector && !last ? (0, jsx_runtime_1.jsx)("span", { className: "mt-xs w-px flex-1 bg-border" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs pt-xs", children: [typeof step.title === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: active ? 'semibold' : 'medium', tone: "onSurface", children: step.title })) : (step.title), step.description != null ? (typeof step.description === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: step.description })) : (step.description)) : null] })] }));
            return ((0, jsx_runtime_1.jsx)("li", { children: onStepClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": done, onClick: () => onStepClick(i), className: "w-full text-left", children: body })) : (body) }, step.id ?? i));
        }) }));
}
//# sourceMappingURL=StepList.js.map