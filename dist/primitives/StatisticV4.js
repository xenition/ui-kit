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
exports.StatisticV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
function inferTrend(delta) {
    if (typeof delta === 'number') {
        if (delta > 0)
            return 'up';
        if (delta < 0)
            return 'down';
    }
    return 'flat';
}
/**
 * Trend → ink.
 *
 * `text-success` / `text-danger` are the FILL colours — what a filled chip is
 * painted with — and the compiler makes no contrast promise about them as text
 * on `surface`. `text-success-text` / `text-danger-text` are exactly that
 * promise. The base was setting a green-on-white delta with the wrong green.
 */
const TREND_CLASS = {
    up: 'text-success-text',
    down: 'text-danger-text',
    flat: 'text-muted-text',
};
const TREND_ARROW = {
    up: '▲',
    down: '▼',
    flat: '→',
};
/**
 * **V4 statistic** — the web twin of the native `StatisticV4`, same props as
 * {@link Statistic}, a different design line.
 *
 * This is one of the two components in the kit where a number is the hero, and
 * the base treats it as a big string. Four changes, all of them about making
 * the number behave like type rather than like text that happens to be large:
 *
 * 1. **Tabular figures.** The single most important fix here. A KPI whose
 *    value ticks — `1,204` → `1,209` — reflows on every update with
 *    proportional digits, and a column of statistics never lines up. Tabular
 *    figures cost nothing and are the difference between comparing two numbers
 *    and re-reading them (§33).
 * 2. **The brand's display face.** A hero number wears `font-heading`; the
 *    base left it on the body face, so the loudest thing on a dashboard was
 *    the one place the brand's type never appeared.
 * 3. **A real baseline.** `items-baseline` replaces `items-end` plus the
 *    `pb-0.5` nudge on the suffix, so `12` and `GB` share a baseline the way
 *    they would in any typeset line rather than being aligned by a
 *    hand-measured offset.
 * 4. **The label is a caption.** `text-xs` and muted, matching
 *    `DescriptionsV4`, so the number grows relative to it without a single
 *    pixel being added to the number (§6 — hierarchy before styling).
 *
 * The arrow is already `aria-hidden`, and stays so: "▲ 12%" should be
 * announced as "12%".
 *
 * **Still not a card.** It renders bare so it can sit in a row, a header or a
 * grid — §11, and a dashboard of tiles each in its own bordered box is the
 * "cards inside cards" §8 bans, at KPI scale.
 */
exports.StatisticV4 = React.forwardRef(function StatisticV4({ className, label, value, delta, trend, suffix, ...rest }, ref) {
    const resolvedTrend = trend ?? inferTrend(delta);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('inline-flex flex-col gap-0.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-muted-text", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-3xl font-bold leading-none text-on-surface [font-variant-numeric:tabular-nums]", children: value }), suffix != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted-text", children: suffix }) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)] text-sm font-semibold [font-variant-numeric:tabular-nums]', TREND_CLASS[resolvedTrend]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs", children: TREND_ARROW[resolvedTrend] }), String(delta)] })) : null] }));
});
//# sourceMappingURL=StatisticV4.js.map