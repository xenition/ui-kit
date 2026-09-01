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
exports.TransactionRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const money_1 = require("../commerce/money");
const row_v4_1 = require("../dashboard/internal/row-v4");
const ledger_v4_1 = require("./internal/ledger-v4");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
/**
 * **V4 transaction row** — the web twin of the native `TransactionRowV4`, same
 * props as {@link TransactionRow}.
 *
 * ## Five changes
 *
 * 1. **The row's name contains the amount.** The base put `aria-label={title}`
 *    on a `role="button"` root, and `button` is children-presentational — so a
 *    reader browsing a statement heard "Whole Foods, button" and never learned
 *    it was −$84.12. The name is now the whole line: merchant, category,
 *    date, then the direction word and the figure.
 * 2. **It is a real `<button>`.** The base used the module's `pressable`
 *    helper — `role="button"` plus `tabIndex` plus a hand-written Enter/Space
 *    handler on a `div`, which is three approximations of what a button
 *    already does, and it made every row a tab stop even before it made one a
 *    button.
 * 3. **Press is a state layer, and focus is the shared ring.** The base had no
 *    press feedback at all and rang itself in `ring-primary-300`, a ramp step
 *    that inverts under `[data-theme="dark"]` while `--xen-ring` is `primary`
 *    already corrected to 3:1 against the page.
 * 4. **It joins the shared row family** — one height, one 44 leading slot, one
 *    set of gutters — with `ListRow`, `NotificationItem` and
 *    `ConversationRow`. The row clears 44 whether or not it has an icon; the
 *    base's height came entirely from the optional avatar, so an iconless feed
 *    drew 32px rows.
 * 5. **The supporting line and the date take `muted-text`**, the
 *    contrast-corrected slot, where the base used `muted` — a ramp step with
 *    no contrast promise — as an ink.
 */
exports.TransactionRowV4 = React.forwardRef(function TransactionRowV4({ title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const signedCents = direction
        ? direction === 'expense'
            ? -Math.abs(amountCents)
            : Math.abs(amountCents)
        : amountCents;
    const safeCents = Number.isFinite(signedCents) ? Math.trunc(signedCents) : 0;
    // The direction word and the figure the button's name has to carry — the
    // payload `aria-label={title}` was pruning.
    const parts = (0, ledger_v4_1.signParts)(safeCents, direction);
    const label = (0, ledger_v4_1.spokenLine)([
        title,
        subtitle,
        date,
        parts.word,
        (0, money_1.formatMoney)(Math.abs(safeCents), currency),
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [icon != null ? ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("span", { className: "flex h-full w-full items-center justify-center rounded-[var(--xen-radius-full)] border border-border bg-surface", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: iconColor, size: "lg" }) }) })) : null, (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: title }), subtitle != null ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: subtitle })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: safeCents, currency: currency, tone: direction ?? 'auto', size: "md", signDisplay: "always" }), date != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: date }) : null] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full', className), ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(subtitle != null), 'rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(subtitle != null)), children: body })) }));
});
//# sourceMappingURL=TransactionRowV4.js.map