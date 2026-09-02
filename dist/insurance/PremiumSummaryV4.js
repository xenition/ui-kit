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
exports.PremiumSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const format_1 = require("./internal/format");
const coverage_v4_1 = require("./coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
const CADENCE_LABEL = {
    monthly: 'per month',
    quarterly: 'per quarter',
    annual: 'per year',
};
/** How many placeholder lines a loading breakdown draws. */
const SKELETON_ROWS = 3;
/**
 * **V4 premium summary** — same props as {@link PremiumSummary} plus
 * `totalLabel`, `emptyLabel` and `emptyDescription`.
 *
 * ## Five changes
 *
 * 1. **`items={[]}` is a real empty state.** The base rendered a card
 *    containing nothing but "Total $0.00" over a rule — a confident, precise
 *    figure asserting that this policy costs nothing, produced by summing an
 *    empty array. A quote that has not loaded and a policy that is genuinely
 *    free were the same screen.
 * 2. **A total that contradicts its own lines says so.** The base's TSDoc
 *    promised the printed total "always reconciles with the lines shown", and
 *    then let `totalCents` win outright: three lines summing to $120.00
 *    printed above a $99.00 Total with nothing to indicate which number the
 *    holder would be charged. `premiumParts` reports the disagreement and the
 *    card surfaces both figures.
 * 3. **A credit is not an achievement.** Every negative line was painted
 *    `text-success` — so a refunded fee, a cancelled rider and a prorated
 *    adjustment all rendered as good news in the colour this kit reserves for
 *    *status*. A credit is a direction, and the leading `−` already says it.
 * 4. **Loading draws the shape it is about to be.** The placeholder rows were
 *    `bg-border` — the hairline token used as a fill, so the skeleton was the
 *    colour of a divider — and they replaced the total row rather than
 *    standing in for it.
 * 5. **The total is announced once.** The base put an `aria-label` on the
 *    figure and then rendered the figure inside it, so the amount was read
 *    from the label and the visible text was dropped; the label and the text
 *    are now the same string, and every word is a prop.
 */
exports.PremiumSummaryV4 = React.forwardRef(function PremiumSummaryV4({ items, totalCents, cadence = 'monthly', currency = 'USD', formatMoney: format = format_1.formatMoney, loading = false, totalLabel = 'Total', emptyLabel = 'No premium breakdown', emptyDescription, loadingLabel = 'Loading premium', formatMismatch, className, ...rest }, ref) {
    const rows = Array.isArray(items) ? items : [];
    const cadenceText = CADENCE_LABEL[cadence] ?? CADENCE_LABEL.monthly;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: "flex flex-col gap-sm", children: [Array.from({ length: SKELETON_ROWS }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(tone_v4_1.SKELETON_CLASS, 'h-4 w-1/2') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(tone_v4_1.SKELETON_CLASS, 'h-4 w-1/5') })] }, index))), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md border-t border-border pt-md", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(tone_v4_1.SKELETON_CLASS, 'h-5 w-1/4') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(tone_v4_1.SKELETON_CLASS, 'h-6 w-1/3') })] })] }) }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription }) }));
    }
    const parts = (0, coverage_v4_1.premiumParts)(rows.map((item) => item.amountCents), totalCents);
    const totalText = format(parts.total, currency);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: rows.map((item, index) => {
                    const cents = Number.isFinite(item.amountCents) ? Math.trunc(item.amountCents) : 0;
                    const credit = cents < 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-muted-text", children: item.label }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', tone_v4_1.TABULAR_CLASS), children: [credit ? '−' : '', format(Math.abs(cents), currency)] })] }, `${item.label}-${index}`));
                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex items-baseline justify-between border-t border-border pt-md", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-card", children: totalLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: cadenceText })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold text-primary-text', tone_v4_1.TABULAR_CLASS), children: totalText })] }), !parts.reconciles ? ((0, jsx_runtime_1.jsx)("p", { role: "status", className: "mt-sm text-xs font-semibold text-warn-text", children: (formatMismatch ??
                    ((total, derived) => (0, tone_v4_1.spokenLine)([
                        `${totalLabel} ${format(total, currency)}`,
                        `lines add up to ${format(derived, currency)}`,
                    ])))(parts.total, parts.derived) })) : null] }));
});
//# sourceMappingURL=PremiumSummaryV4.js.map