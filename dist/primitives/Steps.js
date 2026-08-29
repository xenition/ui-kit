"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Steps = Steps;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/**
 * Horizontal step indicator bound to the theme tokens — for wizards/checkout.
 *
 * **This is a progress indicator, not an instruction list.** Each step gets
 * `flex-1` of the row, so it is at its best with three or four one-word titles
 * ("Cart · Shipping · Pay") and falls apart past that: at eight steps every
 * title collapses to nothing, and there is nowhere to put a body.
 *
 * If what you have is *content* — a recipe method, an onboarding checklist
 * body, a setup guide — reach for {@link StepList} instead. It is the vertical
 * sibling: same numbering, but it grows downward and each step carries a title
 * and a description. `Steps` answers "where am I in this flow"; `StepList`
 * answers "here are the instructions".
 */
function Steps({ steps, current, className }) {
    return ((0, jsx_runtime_1.jsx)("ol", { className: (0, cn_1.cn)('flex w-full items-start', className), children: steps.map((s, i) => {
            const done = i < current;
            const active = i === current;
            return ((0, jsx_runtime_1.jsxs)("li", { className: "flex flex-1 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold', done
                            ? 'bg-primary text-on-primary'
                            : active
                                ? 'border-2 border-primary text-primary'
                                : 'border-2 border-border text-muted'), children: done ? '✓' : i + 1 }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('text-xs font-medium', active || done ? 'text-on-surface' : 'text-muted'), children: s.title }), s.description != null && (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-muted", children: s.description })] })] }, i));
        }) }));
}
//# sourceMappingURL=Steps.js.map