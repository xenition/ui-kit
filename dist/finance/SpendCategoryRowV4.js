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
exports.SpendCategoryRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
/** The words after the share figure, visible and spoken. */
const SHARE_LABEL = 'of spend';
/**
 * **V4 spend-category row** — the web twin of the native
 * `SpendCategoryRowV4`, same props as {@link SpendCategoryRow}.
 *
 * ## Five changes
 *
 * 1. **The row's name contains the money.** `aria-label={category}` on a
 *    `role="button"` root prunes the subtree, so a reader heard "Groceries,
 *    button" and neither the amount nor the share — the two numbers the row is
 *    made of. The name is now the category, the share and the figure.
 * 2. **It is a real `<button>`**, not the module's `role="button"`-on-a-`div`
 *    helper with a hand-written Enter/Space handler.
 * 3. **Press is a state layer and focus is `ring-ring`.** There was no press
 *    feedback at all, and the focus ring was `ring-primary-300` — a ramp step,
 *    which keeps its light-mode orientation under `[data-theme="dark"]`.
 * 4. **It joins the shared row family**, so a category, a transaction and a
 *    settings row are one height and one set of gutters, and the row clears 44
 *    whether or not the optional glyph is there.
 * 5. **The captions take `muted-text`**, the contrast-corrected slot, where
 *    the base used `muted` — a ramp step with no contrast promise — as an ink.
 */
exports.SpendCategoryRowV4 = React.forwardRef(function SpendCategoryRowV4({ category, amountCents, currency = 'USD', share, icon, color = 'primary', onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const clampedShare = typeof share === 'number' && Number.isFinite(share)
        ? Math.min(Math.max(share, 0), 1)
        : undefined;
    const percent = clampedShare != null ? Math.round(clampedShare * 100) : undefined;
    const percentText = percent != null ? `${new Intl.NumberFormat().format(percent)}%` : undefined;
    // `Icon` has no `accent` slot; the glyph falls back to `primary` while the
    // bar keeps the requested colour — the base's own compromise.
    const iconColor = color === 'accent' ? 'primary' : color;
    const money = (0, money_1.formatMoney)(Number.isFinite(amountCents) ? Math.trunc(amountCents) : 0, currency);
    const label = (0, ledger_v4_1.spokenLine)([
        category,
        percentText != null ? `${percentText} ${SHARE_LABEL}` : undefined,
        money,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [icon != null ? ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: iconColor, size: "xl" }) })) : null, (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: category }), percentText != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', ledger_v4_1.TABULAR_CLASS), children: percentText })) : null] }), clampedShare != null ? ((0, jsx_runtime_1.jsx)("span", { role: "progressbar", "aria-label": (0, ledger_v4_1.spokenLine)([category, `${percentText} ${SHARE_LABEL}`]), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": percent, className: "block h-sm w-full overflow-hidden rounded-[var(--xen-radius-full)] bg-selected", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('block h-full rounded-[var(--xen-radius-full)]', tone_v4_1.TONE_BG[color]), style: { width: `${clampedShare * 100}%` } }) })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: amountCents, currency: currency, tone: "neutral", size: "sm" }) })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full', className), ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(clampedShare != null), 'rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-row": "", className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(clampedShare != null)), children: body })) }));
});
//# sourceMappingURL=SpendCategoryRowV4.js.map