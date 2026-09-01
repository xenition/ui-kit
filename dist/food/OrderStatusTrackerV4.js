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
exports.OrderStatusTrackerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const menu_v4_1 = require("./internal/menu-v4");
/**
 * The four stages, in the order they are drawn — the shared list, not a copy.
 * The two spellings were out of step until `order-v4.ts` was corrected, and a
 * local duplicate is how they would drift again.
 */
const ORDER = menu_v4_1.ORDER_STAGES;
const DEFAULT_LABELS = {
    placed: 'Order placed',
    preparing: 'Preparing',
    'out-for-delivery': 'Out for delivery',
    delivered: 'Delivered',
};
/** Announced words per state — status is never carried by colour alone. */
const STATE_WORD = {
    complete: 'completed',
    current: 'in progress',
    upcoming: 'upcoming',
};
/** Token marker classes per state — a glyph is ALSO drawn, never colour alone. */
function markerClass(state, failed) {
    if (failed)
        return 'border-danger bg-danger text-on-danger';
    if (state === 'complete')
        return 'border-success bg-success text-on-success';
    if (state === 'current')
        return 'border-primary bg-primary text-on-primary';
    return 'border-border bg-card text-muted-text';
}
/**
 * **V4 order status tracker** — the web twin of the native
 * `OrderStatusTrackerV4`, same props as {@link OrderStatusTracker} plus
 * `stageLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **The tracker stops silencing itself.** `role="progressbar"` sat on the
 *    root, and that role is children-presentational — so every stage label,
 *    every timestamp and every per-step state word inside it was pruned. With
 *    no `aria-label` or `aria-valuetext` either, the whole component announced
 *    as an unnamed "1 of 4". The value now lives on an element that contains
 *    nothing, the steps are a real ordered list, and both are read.
 * 2. **An unrecognised status says so.** `Math.max(0, indexOf(status))` mapped
 *    a `-1` miss onto stage 1, so a typo — or a backend that adds a stage —
 *    rendered a confident, entirely wrong "Order placed, in progress".
 *    `stageIndex()` returns `undefined` and `unknownLabel` is what a user
 *    sees.
 * 3. **A cancelled order does not report as progressing.** It kept counting up
 *    through the progressbar's value while the step beside it read "cancelled".
 *    Cancelled drops the meter and says the word.
 * 4. **The upcoming marker is inked with the corrected slots** — `text-muted`
 *    is a fill, and `bg-surface` is the page, under a component that lives on
 *    a card.
 */
exports.OrderStatusTrackerV4 = React.forwardRef(function OrderStatusTrackerV4({ status, variant = 'horizontal', labels, stageLabels, timestamps, cancelled = false, unknownLabel = 'Order status unavailable', className, ...rest }, ref) {
    const vertical = variant === 'vertical';
    const currentIndex = (0, menu_v4_1.stageIndex)(status);
    const known = currentIndex !== undefined;
    const labelFor = (stage) => stageLabels?.[stage] ?? labels?.[stage] ?? DEFAULT_LABELS[stage];
    const stepState = (index) => {
        if (currentIndex === undefined)
            return 'upcoming';
        if (index < currentIndex)
            return 'complete';
        if (index === currentIndex)
            return 'current';
        return 'upcoming';
    };
    const currentStage = known ? ORDER[currentIndex] : undefined;
    const groupLabel = known
        ? (0, menu_v4_1.spokenLine)([
            currentStage ? labelFor(currentStage) : undefined,
            cancelled ? 'cancelled' : `step ${currentIndex + 1} of ${ORDER.length}`,
        ])
        : unknownLabel;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": groupLabel, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: [known && !cancelled ? ((0, jsx_runtime_1.jsx)("span", { role: "progressbar", "aria-label": groupLabel, "aria-valuemin": 1, "aria-valuemax": ORDER.length, "aria-valuenow": currentIndex + 1, "aria-valuetext": groupLabel, className: "sr-only" })) : null, !known ? ((0, jsx_runtime_1.jsx)("p", { role: "status", className: "text-sm text-muted-text", children: unknownLabel })) : null, (0, jsx_runtime_1.jsx)("ol", { className: (0, cn_1.cn)(vertical ? 'flex flex-col' : 'flex flex-row items-start'), children: ORDER.map((stage, index) => {
                    const state = stepState(index);
                    const failed = cancelled && state === 'current';
                    const label = labelFor(stage);
                    const time = timestamps?.[stage];
                    const glyph = failed
                        ? '✕'
                        : state === 'complete'
                            ? '✓'
                            : state === 'current'
                                ? '●'
                                : '○';
                    const stateWord = failed ? 'cancelled' : STATE_WORD[state];
                    const isLast = index === ORDER.length - 1;
                    const leftFilled = known && index <= currentIndex;
                    const rightFilled = known && index < currentIndex;
                    const marker = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-xl w-xl shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold leading-none', markerClass(state, failed)), children: glyph }));
                    const textBlock = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex flex-col gap-xs', !vertical && 'items-center text-center'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', state === 'current' ? 'font-bold' : 'font-medium', state === 'upcoming' ? 'text-muted-text' : 'text-on-card'), children: label }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: time }) : null, (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: stateWord })] }));
                    if (vertical) {
                        return ((0, jsx_runtime_1.jsxs)("li", { className: "flex flex-row gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col items-center", children: [marker, !isLast ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-[calc(var(--xen-space-xs)_/_2)] flex-1', 'min-h-[var(--xen-space-lg)]', rightFilled ? 'bg-success' : 'bg-border') })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1', !isLast && 'pb-lg'), children: textBlock })] }, stage));
                    }
                    return ((0, jsx_runtime_1.jsxs)("li", { className: "flex flex-1 flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex w-full items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-[calc(var(--xen-space-xs)_/_2)] flex-1', index === 0 ? 'bg-transparent' : leftFilled ? 'bg-success' : 'bg-border') }), marker, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-[calc(var(--xen-space-xs)_/_2)] flex-1', isLast ? 'bg-transparent' : rightFilled ? 'bg-success' : 'bg-border') })] }), (0, jsx_runtime_1.jsx)("span", { className: "mt-xs px-xs", children: textBlock })] }, stage));
                }) })] }));
});
//# sourceMappingURL=OrderStatusTrackerV4.js.map