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
exports.ExchangeRateRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const ledger_v4_1 = require("./internal/ledger-v4");
/**
 * **V4 exchange-rate row** — the web twin of the native `ExchangeRateRowV4`,
 * same props as {@link ExchangeRateRow} plus `locale`.
 *
 * ## Five changes
 *
 * 1. **The rate goes through `Intl`.** `toFixed` hard-locks the decimal mark
 *    to `.` and never groups, so a de-DE app printed "1.234,56 EUR" from the
 *    amount components and "0.9184" from this one, in the same list.
 * 2. **A large `precision` no longer throws.** `Math.max(0, …)` clamped the
 *    bottom and left the top open, so any value above 100 raised a
 *    `RangeError` out of `toFixed` and took the screen with it.
 *    `ratePrecision()` clamps both ends.
 * 3. **A zero change is not a green gain.** `(changePct ?? 0) >= 0` painted
 *    "▲ +0.00%" in `success`, which reads as a rise that did not happen.
 * 4. **Direction is a sign, not a hue.** The percentage carries `+` / `−`
 *    from `Intl`'s `signDisplay`, so it survives greyscale, and the arrow
 *    beside it is decoration.
 * 5. **It is a real `<button>` when it is interactive**, from the shared row
 *    family, with a press state layer and `ring-ring` — where the base used
 *    the module's `role="button"`-on-a-`div` helper, no press feedback and
 *    `ring-primary-300`, a ramp step that inverts under
 *    `[data-theme="dark"]`.
 */
exports.ExchangeRateRowV4 = React.forwardRef(function ExchangeRateRowV4({ baseCurrency, quoteCurrency, rate, changePct, precision = 4, locale, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const digits = (0, ledger_v4_1.ratePrecision)(precision);
    const rateText = new Intl.NumberFormat(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(Number.isFinite(rate) ? rate : 0);
    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const change = (0, ledger_v4_1.signParts)(hasChange ? changePct : 0);
    const changeText = hasChange ? `${(0, ledger_v4_1.pctText)(changePct, locale)}%` : undefined;
    const arrow = change.direction === 'credit' ? '▲' : change.direction === 'debit' ? '▼' : '';
    const name = (0, ledger_v4_1.spokenLine)([`${baseCurrency} to ${quoteCurrency}`, rateText, changeText]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1 truncate text-base font-semibold text-on-surface", children: [baseCurrency, " ", (0, jsx_runtime_1.jsx)("span", { className: "text-muted-text", children: "\u2192" }), " ", quoteCurrency] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-base font-bold text-on-surface', ledger_v4_1.TABULAR_CLASS), children: rateText }), changeText != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-semibold', change.direction === 'zero' ? 'text-muted-text' : (0, ledger_v4_1.moneyInkClass)(change.tone), ledger_v4_1.TABULAR_CLASS), children: [arrow !== '' ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "mr-xs", children: arrow })) : null, changeText] })) : null] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full', className), ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(false), 'rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(false)), children: body })) }));
});
//# sourceMappingURL=ExchangeRateRowV4.js.map