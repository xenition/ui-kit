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
exports.QuoteCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const money_1 = require("../commerce/money");
const crm_v4_1 = require("./internal/crm-v4");
const internal_1 = require("./internal");
/**
 * **V4 quote card** — the web twin of the native `QuoteCardV4`, same props as
 * {@link QuoteCard} plus `formatLineItems` and `statusLabel`.
 *
 * ## Four changes
 *
 * 1. **The action is not nested inside the card's activation.** The base
 *    guarded the identical nesting `ContactCard` has with a
 *    `stopPropagation` — which works, and which is a patch over an invalid
 *    tree: interactive content inside a `role="button"`. The card's own
 *    activation is a real `<button>` around the identity block, and the action
 *    is that button's **sibling**, so no event has anywhere to bubble to and
 *    the guard is unnecessary rather than load-bearing.
 * 2. **The status is announced.** On native the label sat on a `View` that was
 *    not an accessibility element, so it was dropped in silence; the badge is
 *    named on both twins now, and `statusLabel` says what the word is *for*.
 * 3. **One accessible name.** `Quote Q-1042` replaced the subtree, so the
 *    total, the item count, the validity date and the status — everything the
 *    card is for — were never announced.
 * 4. **The grand total is tabular, the badge is `BADGE_V4` on both twins, and
 *    a press is a state layer.**
 */
exports.QuoteCardV4 = React.forwardRef(function QuoteCardV4({ number, company, totalCents, currency = 'USD', lineItems, status, validUntil, actionLabel, onAction, formatLineItems, statusLabel = 'Status', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!number)
        return null;
    const meta = internal_1.QUOTE_META[status];
    const spellItems = formatLineItems ?? ((n) => `${n} item${n === 1 ? '' : 's'}`);
    const itemsLabel = lineItems != null && lineItems > 0 ? spellItems(lineItems) : undefined;
    const money = (0, money_1.formatMoney)(totalCents, currency);
    const caption = (0, crm_v4_1.metaLine)([itemsLabel, validUntil]);
    const statusName = `${statusLabel} ${meta.label}`;
    const label = (0, crm_v4_1.spokenLine)([number, company, money, itemsLabel, validUntil, statusName]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold text-on-surface", children: number }), company ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: company }) : null] }), (0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: meta.tone, role: "img", "aria-label": statusName, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-end justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-bold text-on-surface', crm_v4_1.TABULAR_CLASS), children: money }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: caption }) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex w-full flex-col gap-sm rounded-[var(--xen-radius-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-col gap-sm", children: body })), actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "soft", size: "sm", onClick: onAction, className: chrome_v4_1.MIN_TAP_CLASS, children: actionLabel })) : null] }));
});
//# sourceMappingURL=QuoteCardV4.js.map