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
exports.OrderStatusTracker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ORDER = ['placed', 'preparing', 'out-for-delivery', 'delivered'];
const DEFAULT_LABELS = {
    placed: 'Order placed',
    preparing: 'Preparing',
    'out-for-delivery': 'Out for delivery',
    delivered: 'Delivered',
};
/** Announced words per state — a11y must not rely on color alone. */
const STATE_WORD = {
    complete: 'completed',
    current: 'in progress',
    upcoming: 'upcoming',
};
/** Token marker classes per state — a glyph is ALSO drawn, never color-alone. */
function markerClass(state, failed) {
    if (failed)
        return 'border-danger bg-danger text-on-danger';
    if (state === 'complete')
        return 'border-success bg-success text-on-success';
    if (state === 'current')
        return 'border-primary bg-primary text-on-primary';
    return 'border-border bg-surface text-muted';
}
/**
 * A four-stage delivery progress tracker: placed → preparing → out for delivery
 * → delivered. Completed steps show a check glyph, the current step a filled
 * dot, upcoming steps a hollow ring — and every step is *also* announced with
 * its state word ("completed" / "in progress" / "upcoming") so status is never
 * conveyed by color alone. `variant` switches horizontal vs. vertical. When
 * `cancelled`, the current step reads as failed. Web parity of the native
 * `OrderStatusTracker`; token-only, `role="progressbar"`.
 */
exports.OrderStatusTracker = React.forwardRef(function OrderStatusTracker({ status, variant = 'horizontal', labels, timestamps, cancelled = false, className, ...rest }, ref) {
    const currentIndex = Math.max(0, ORDER.indexOf(status));
    const vertical = variant === 'vertical';
    const stepState = (index) => {
        if (index < currentIndex)
            return 'complete';
        if (index === currentIndex)
            return 'current';
        return 'upcoming';
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "progressbar", "aria-valuemin": 1, "aria-valuemax": ORDER.length, "aria-valuenow": currentIndex + 1, className: (0, cn_1.cn)(vertical ? 'flex flex-col' : 'flex flex-row items-start', className), ...rest, children: ORDER.map((stage, index) => {
            const state = stepState(index);
            const failed = cancelled && state === 'current';
            const label = labels?.[stage] ?? DEFAULT_LABELS[stage];
            const time = timestamps?.[stage];
            const glyph = failed ? '✕' : state === 'complete' ? '✓' : state === 'current' ? '●' : '○';
            const stateWord = failed ? 'cancelled' : STATE_WORD[state];
            const isLast = index === ORDER.length - 1;
            const leftFilled = index <= currentIndex;
            const rightFilled = index < currentIndex;
            const marker = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold leading-none', markerClass(state, failed)), children: glyph }));
            const textBlock = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex flex-col gap-0.5', !vertical && 'items-center text-center'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', state === 'current' ? 'font-bold text-on-surface' : 'font-medium', state === 'upcoming' ? 'text-muted' : 'text-on-surface'), children: label }), time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: time }) : null] }));
            const a11y = `${label}: ${stateWord}${time ? `, ${time}` : ''}`;
            if (vertical) {
                return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": a11y, className: "flex flex-row gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [marker, !isLast ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-0.5 flex-1', rightFilled ? 'bg-success' : 'bg-border'), style: { minHeight: 24 } })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex-1', !isLast && 'pb-[var(--xen-space-lg)]'), children: textBlock })] }, stage));
            }
            return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": a11y, className: "flex flex-1 flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-0.5 flex-1', index === 0 ? 'bg-transparent' : leftFilled ? 'bg-success' : 'bg-border') }), marker, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-0.5 flex-1', isLast ? 'bg-transparent' : rightFilled ? 'bg-success' : 'bg-border') })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xs)] px-0.5", children: textBlock })] }, stage));
        }) }));
});
//# sourceMappingURL=OrderStatusTracker.js.map