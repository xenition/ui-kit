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
exports.BalanceHeaderV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Sparkline_1 = require("../charts/Sparkline");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
/**
 * **V4 balance header** — the web twin of the native `BalanceHeaderV4`, same
 * props as {@link BalanceHeader} plus `locale` and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The sparkline is toned from the series it draws.** Its colour came from
 *    `changeCents`, which is optional — so a header given only `trend` fell to
 *    `up = (undefined ?? 0) >= 0`, and a balance collapsing across twelve
 *    points was drawn in `success`. The line now reads its own first and last
 *    values, and a flat series is neither.
 * 2. **A zero change is not a gain.** `>= 0` painted "+$0.00" green with an ▲
 *    beside it. `signParts()` gives zero its own neutral tone and no glyph.
 * 3. **The percentage goes through `Intl`.** It was built by string
 *    concatenation — unrounded and unclamped, so a `changePct` of
 *    `12.3456789` printed in full, and the decimal mark was hard-locked to `.`
 *    while the amount above it went through `Intl` and used the locale's.
 * 4. **Loading is announced and takes the shared placeholder.** The skeleton
 *    was `bg-border` — the *hairline* colour used as a surface — and nothing
 *    told a reader the figure was on its way.
 * 5. **The change is drawn in the contrast-corrected ink** (via
 *    {@link MoneyAmountV4}), where the base used `text-success` /
 *    `text-danger`, which are fills.
 */
exports.BalanceHeaderV4 = React.forwardRef(function BalanceHeaderV4({ label = 'Total balance', balanceCents, currency = 'USD', changeCents, changePct, trend, formatMoney: format, loading = false, locale, loadingLabel = 'Loading balance', className, ...rest }, ref) {
    const fmt = format ?? ((cents, code) => (0, money_1.formatMoney)(cents, code, locale));
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const change = (0, ledger_v4_1.signParts)(hasChange ? changeCents : 0);
    // The line's own numbers decide its tone. A flat series is `muted`: it is
    // neither a gain nor a loss, and calling it either is a lie the eye reads
    // before it reads the figure.
    const series = (trend ?? []).filter((point) => Number.isFinite(point));
    const first = series[0];
    const last = series[series.length - 1];
    const trendTone = series.length < 2 || first === undefined || last === undefined || last === first
        ? 'muted'
        : last > first
            ? 'success'
            : 'danger';
    const arrow = change.direction === 'credit' ? '▲' : change.direction === 'debit' ? '▼' : '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: label }), loading ? ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", "aria-label": loadingLabel, 
                // The shape the figure is about to be, in the shared placeholder
                // ground — not the hairline token stretched into a block.
                className: (0, cn_1.cn)('h-xl w-[calc(var(--xen-space-2xl)*4)]', ledger_v4_1.PLACEHOLDER_CLASS) })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-bold text-on-surface', ledger_v4_1.TABULAR_CLASS), children: fmt(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency) })), hasChange && !loading ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex items-center gap-xs text-sm', 
                // Zero keeps `on-surface`, exactly as the figure inside it does.
                change.direction === 'zero' ? 'text-on-surface' : (0, ledger_v4_1.moneyInkClass)(change.tone)), children: [arrow !== '' ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs", children: arrow })) : null, (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: changeCents, currency: currency, formatMoney: fmt, size: "sm", signDisplay: "always" }), typeof changePct === 'number' && Number.isFinite(changePct) ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-semibold', ledger_v4_1.TABULAR_CLASS), children: `(${(0, ledger_v4_1.pctText)(changePct, locale)}%)` })) : null] })) : null, series.length > 0 && !loading ? (
            // Decorative: every figure the line encodes is already written out
            // above it, and "Sparkline, 12 points" is not one of them.
            (0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { "aria-hidden": "true", data: series, color: trendTone, className: "mt-xs" })) : null] }));
});
//# sourceMappingURL=BalanceHeaderV4.js.map