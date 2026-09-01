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
exports.TokenRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const money_1 = require("../commerce/money");
const row_v4_1 = require("../dashboard/internal/row-v4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * The disc's ground and the ink drawn on it, as a **pair**.
 *
 * The base drew `Icon color={iconColor}` on a fixed `bg-neutral-100` disc, so
 * the default `primary` was a fill token inking text and an `onPrimary` glyph
 * — a slot whose only contrast promise is against `primary` — landed on a
 * neutral plate. An `on*` slot brings the fill it is paired with; a fill slot
 * keeps the neutral disc and inks with the contrast-corrected `*Text` form.
 */
const DISC = {
    onSurface: { ground: 'bg-surface', ink: 'text-on-surface' },
    onPrimary: { ground: 'bg-primary', ink: 'text-on-primary' },
    onSuccess: { ground: 'bg-success', ink: 'text-on-success' },
    onWarn: { ground: 'bg-warn', ink: 'text-on-warn' },
    onDanger: { ground: 'bg-danger', ink: 'text-on-danger' },
    primary: { ground: 'bg-card border border-border', ink: 'text-primary-text' },
    muted: { ground: 'bg-card border border-border', ink: 'text-muted-text' },
    success: { ground: 'bg-card border border-border', ink: 'text-success-text' },
    warn: { ground: 'bg-card border border-border', ink: 'text-warn-text' },
    danger: { ground: 'bg-card border border-border', ink: 'text-danger-text' },
};
/**
 * **V4 token row** — the web twin of the native `TokenRowV4`, same props as
 * {@link TokenRow} plus `directionLabels`.
 *
 * ## Five changes
 *
 * 1. **The row announces its numbers.** `aria-label="ETH holding"` sat on the
 *    interactive root, and an accessible name *replaces* the subtree — so the
 *    quantity, the fiat value and the 24h change, which are the entire reason
 *    the row exists, were never spoken. One name now carries all of them.
 * 2. **A loss is no longer announced as a gain.** The label was built as
 *    `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` ``, and
 *    `formatPct` re-applies a sign — so `Math.abs` guaranteed a `+` and a 3.2%
 *    drop read "down +3.20%". `>= 0` also sent a flat `0` down the "up" branch
 *    while the glyph beside it was `•`. Word, glyph and tone now come from one
 *    `changeParts()` call and cannot disagree.
 * 3. **The change is inked, not filled.** `changeToneClass()` hands back
 *    `text-success` / `text-danger` / `text-muted` — fill slots, with no
 *    contrast promise for text.
 * 4. **The ticker is not truncated to three characters.** `slice(0, 3)` turned
 *    every four-letter ticker into a different token on screen; the disc shows
 *    the symbol and ellipsises if it must.
 * 5. **A press is a state layer** on the shared row body, so a token row, a
 *    settings row and a notification are one family — and it is a real
 *    `<button>`, not a `div` wearing `role="button"` and a hand-written
 *    Enter/Space handler.
 */
exports.TokenRowV4 = React.forwardRef(function TokenRowV4({ symbol, name, amount, decimals = 4, valueCents, currency = 'USD', changePct, icon, iconColor = 'primary', onClick, directionLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    const disc = DISC[iconColor];
    const hasChange = changePct != null;
    const change = (0, market_v4_1.changeParts)(changePct, directionLabels);
    const quantity = (0, format_1.formatToken)(amount, { decimals, symbol });
    const label = (0, market_v4_1.spokenLine)([
        symbol,
        name,
        quantity,
        valueCents != null ? (0, money_1.formatMoney)(valueCents, currency) : undefined,
        hasChange ? `${change.word} ${(0, format_1.formatPct)(changePct ?? 0)}` : undefined,
    ]);
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(name != null), 'rounded-[var(--xen-radius-md)]');
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-full w-full items-center justify-center overflow-hidden rounded-[var(--xen-radius-full)]', disc.ground), children: icon != null ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-lg', disc.ink), children: icon })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate px-xs text-xs font-bold', disc.ink), children: symbol.toUpperCase() })) }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: symbol }), name != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: name }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-semibold text-on-card', market_v4_1.TABULAR_CLASS), children: quantity }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "muted", size: "sm" })) : null, hasChange ? ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": onClick ? true : undefined, className: (0, cn_1.cn)('text-xs font-semibold', market_v4_1.TABULAR_CLASS, (0, market_v4_1.changeInkClass)(change.tone)), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: change.glyph }), ' ', onClick ? null : (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: `${change.word} ` }), (0, format_1.formatPct)(changePct ?? 0)] })) : null] })] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(rowClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: rowClass, children: body })) }));
});
//# sourceMappingURL=TokenRowV4.js.map