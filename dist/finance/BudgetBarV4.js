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
exports.BudgetBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
/** The caption in front of a positive remainder. */
const REMAINING_LABEL = 'Remaining';
/**
 * **V4 budget bar** — the web twin of the native `BudgetBarV4`, same props as
 * {@link BudgetBar} plus `overLabel` and `formatPercent`.
 *
 * ## Four changes
 *
 * 1. **The bar and its name stop disagreeing.** The base clamped the drawn
 *    fill and left the announced percentage uncapped, so a category at 300%
 *    spent reported `aria-valuenow="100"` beside a name reading "300% of
 *    budget used". Both numbers are real and they are not the same number:
 *    `meterParts()` hands the clamped ratio to the meter, and the true percent
 *    goes to `aria-valuetext`, which is what a reader actually says.
 * 2. **The overspend has a sign and a word.** `signDisplay="never"` on the
 *    remainder meant −$40.00 and +$40.00 rendered the identical string, and
 *    the only difference between "you have $40 left" and "you are $40 over"
 *    was the hue — invisible in greyscale and to a red-green viewer.
 * 3. **The remainder is legible.** It was `text-muted` — a ramp step with no
 *    contrast promise — used as an ink, on the one figure in the component a
 *    user is looking for.
 * 4. **The size override applies.** The base passed `size="sm"` *and*
 *    `className="text-xs font-semibold"` to `MoneyAmount`; `cn()` is a plain
 *    joiner, so both landed on the element and Tailwind's emit order restored
 *    the originals — while the native twin's style object applied, and the two
 *    twins drew the same figure at different sizes. The size comes from the
 *    prop, and nothing is passed that cannot win.
 */
exports.BudgetBarV4 = React.forwardRef(function BudgetBarV4({ label, spentCents, limitCents, currency = 'USD', formatMoney: format = money_1.formatMoney, overLabel = 'over', formatPercent, className, ...rest }, ref) {
    const spent = Number.isFinite(spentCents) ? Math.max(Math.trunc(spentCents), 0) : 0;
    const limit = Number.isFinite(limitCents) ? Math.trunc(limitCents) : 0;
    const { ratio, percent, over } = (0, ledger_v4_1.meterParts)(spent, limit);
    const remaining = limit - spent; // positive = left, negative = over
    const spellPercent = formatPercent ??
        ((value) => `${new Intl.NumberFormat().format(value)}% of budget used`);
    const percentText = spellPercent(percent);
    const fill = over ? 'danger' : percent >= 75 ? 'warn' : 'success';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', ledger_v4_1.TABULAR_CLASS), children: `${format(spent, currency)} / ${format(limit, currency)}` })] }), (0, jsx_runtime_1.jsx)("span", { role: "progressbar", "aria-label": (0, ledger_v4_1.spokenLine)([label, percentText]), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(ratio * 100), "aria-valuetext": percentText, className: "block h-sm w-full overflow-hidden rounded-[var(--xen-radius-full)] bg-selected", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('block h-full rounded-[var(--xen-radius-full)]', tone_v4_1.TONE_BG[fill]), style: { width: `${ratio * 100}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: remaining >= 0 ? REMAINING_LABEL : overLabel }), (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: remaining, currency: currency, formatMoney: format, tone: remaining >= 0 ? 'muted' : 'expense', size: "sm" })] })] }));
});
//# sourceMappingURL=BudgetBarV4.js.map