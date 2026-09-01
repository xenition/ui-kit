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
exports.TipSelectorV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const menu_v4_1 = require("./internal/menu-v4");
const DEFAULT_PERCENTS = [10, 15, 20, 25];
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
const PRIMARY_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-primary)', 'var(--xen-on-primary)');
/**
 * **V4 tip selector** — the web twin of the native `TipSelectorV4`, same props
 * as {@link TipSelector} plus `noTipLabel` and `defaultSelectedPercent`.
 *
 * ## Five changes
 *
 * 1. **It works when you drop it in.** `selectedPercent` was optional,
 *    `selected` was recomputed from props on every render and the component
 *    held no state — so an uncontrolled `TipSelector` rendered "No tip" filled
 *    and `aria-checked` **forever**, and every tap emitted `onSelect` while
 *    nothing on screen moved. This is the third module in the kit with that
 *    exact shape, after `EmailThread` and `SwipeDeck`. Passing
 *    `selectedPercent` still hands control back to the caller; omitting it now
 *    means the control owns its own state, seeded from
 *    `defaultSelectedPercent`.
 * 2. **Options clear 44.** They were a 14px label in `py-sm` — roughly half a
 *    target, on a row of controls a thumb hits at checkout.
 * 3. **The computed amount is part of the option's name.** `role="radio"` is
 *    children-presentational, so the `$4.50` under "20%" was drawn and pruned.
 * 4. **Press is a state layer and focus is the `ring` token**, replacing
 *    `hover:bg-neutral-100` — a light-oriented ramp step — and
 *    `ring-primary-300`.
 * 5. **The unselected amount is inked with `mutedText`**, the
 *    contrast-corrected slot, rather than `muted`, which is a fill.
 */
exports.TipSelectorV4 = React.forwardRef(function TipSelectorV4({ percents = DEFAULT_PERCENTS, selectedPercent, defaultSelectedPercent = null, onSelect, subtotalCents, currency = 'USD', title = 'Add a tip', allowNone = true, noTipLabel = 'No tip', formatMoney = commerce_1.formatMoney, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const controlled = selectedPercent !== undefined;
    const [internal, setInternal] = React.useState(defaultSelectedPercent);
    const active = controlled ? selectedPercent : internal;
    const choose = (percent) => {
        if (!controlled)
            setInternal(percent);
        onSelect?.(percent);
    };
    const choices = [
        ...(allowNone ? [{ key: 'none', percent: null, label: noTipLabel }] : []),
        ...percents.map((p) => ({ key: String(p), percent: p, label: `${p}%` })),
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("h4", { className: "font-heading text-base font-semibold text-on-surface", children: title })) : null, (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": title, className: "flex gap-sm", children: choices.map((choice) => {
                    const selected = choice.percent === active;
                    const amount = choice.percent !== null && typeof subtotalCents === 'number'
                        ? Math.round((subtotalCents * choice.percent) / 100)
                        : null;
                    const amountText = amount !== null ? formatMoney(amount, currency) : undefined;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": (0, menu_v4_1.spokenLine)([choice.label, amountText]), onClick: () => choose(choice.percent), "data-xen-v4-state": "", style: selected ? PRIMARY_STATE : CARD_STATE, className: (0, cn_1.cn)('flex flex-1 flex-col items-center justify-center gap-xs px-xs py-sm', chrome_v4_1.MIN_TAP_CLASS, 'rounded-[var(--xen-radius-md)] border', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', selected
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-border bg-card text-on-card'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", children: choice.label }), amountText ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', menu_v4_1.TABULAR_CLASS, selected ? 'text-on-primary' : 'text-muted-text'), children: amountText })) : null] }, choice.key));
                }) })] }));
});
//# sourceMappingURL=TipSelectorV4.js.map