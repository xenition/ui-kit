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
exports.GasFeeRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const money_1 = require("../commerce/money");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
const SPEED_META = {
    slow: { label: 'Slow', glyph: '🐢' },
    average: { label: 'Average', glyph: '🚶' },
    fast: { label: 'Fast', glyph: '⚡' },
};
/**
 * **V4 gas-fee tier** — the web twin of the native `GasFeeRowV4`, same props as
 * {@link GasFeeRow} plus `speedLabels`.
 *
 * ## Four changes
 *
 * 1. **It is a real radio.** The base was a `div` carrying `role="radio"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler — three
 *    approximations of a control the platform already ships, and one that
 *    never joined a radio group. The input is a real `<input type="radio">`
 *    covering the row, so checked state, activation and focus come from the
 *    browser.
 * 2. **The tier announces its numbers.** `aria-label="Average gas"` replaced
 *    the subtree, so the gwei price, the ETA and the fiat cost — the only
 *    things that distinguish one tier from another — were never spoken. Beyond
 *    Slow / Average / Fast, every tier announced identically.
 * 3. **Selected is a token, not a ramp step.** `bg-primary-50` is a
 *    light-oriented step that paints a pale plate onto a dark page;
 *    `--xen-selected` is the compiler's slot for exactly this, and it ships
 *    with `--xen-on-selected` so the copy on it keeps a contrast pair.
 * 4. **The row clears 44, and hover and press are a state layer** rather than
 *    a `cursor-pointer` and nothing else.
 */
exports.GasFeeRowV4 = React.forwardRef(function GasFeeRowV4({ speed, gwei, costCents, currency = 'USD', eta, selected = false, onSelect, speedLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const meta = SPEED_META[speed];
    const word = speedLabels?.[speed] ?? meta.label;
    const gweiText = (0, format_1.formatToken)(gwei, { decimals: 2, symbol: 'gwei' });
    const label = (0, market_v4_1.spokenLine)([
        word,
        gweiText,
        eta,
        costCents != null ? (0, money_1.formatMoney)(costCents, currency) : undefined,
    ]);
    const surface = (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-md)] border px-md py-sm', chrome_v4_1.MIN_TAP_CLASS, selected ? 'border-primary bg-selected text-on-selected' : 'border-border bg-card text-on-card');
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold", children: word }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', market_v4_1.TABULAR_CLASS), children: eta != null ? `${gweiText} · ${eta}` : gweiText })] }), costCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: costCents, currency: currency, tone: "neutral", size: "sm" })) : null] }));
    if (!onSelect) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: surface, children: content }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("label", { "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(selected ? 'var(--xen-selected)' : 'var(--xen-card)', selected ? 'var(--xen-on-selected)' : 'var(--xen-on-card)'), className: (0, cn_1.cn)(surface, 'relative cursor-pointer', 'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring'), children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", checked: selected, "aria-label": label, onChange: () => onSelect(speed), className: "absolute inset-0 h-full w-full cursor-pointer opacity-0" }), content] }) }));
});
//# sourceMappingURL=GasFeeRowV4.js.map