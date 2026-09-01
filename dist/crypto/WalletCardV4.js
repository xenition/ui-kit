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
exports.WalletCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const money_1 = require("../commerce/money");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
const KIND_META = {
    hot: { label: 'Hot', tone: 'warn', glyph: '🔥' },
    hardware: { label: 'Hardware', tone: 'success', glyph: '🔒' },
    watch: { label: 'Watch-only', tone: 'neutral', glyph: '👁' },
};
/** How long the copy confirmation stays in the live region, in ms. */
const COPIED_DWELL_MS = 2000;
/**
 * **V4 wallet card** — the web twin of the native `WalletCardV4`, same props as
 * {@link WalletCard} plus `copyLabel`, `copiedLabel` and `addressLead`.
 *
 * ## Five changes
 *
 * 1. **Copy does one thing.** The copy chip was a real `<button>` sitting
 *    *inside* a root that `pressableProps()` had turned into a
 *    `role="button"` with its own handler, so on the web one tap both copied
 *    the address and opened the wallet. Native's inner `Pressable` consumed
 *    the touch and did not, so the same props produced two behaviours. Fixed
 *    the way `ContactCardV4` fixed it: the card's activation is a real
 *    `<button>` around the identity region only, and the chip is its sibling.
 *    No `stopPropagation`, because there is no ancestor handler left.
 * 2. **`variant` reaches `Card` on the web too.** `elevated` is this
 *    component's own default and the web twin dropped it on the floor, so the
 *    default wallet card was raised on the phone and flat in the browser.
 * 3. **Eight leading hex digits, not four.** See `addressLead`.
 * 4. **The card announces its balance.** `aria-label={label}` replaced the
 *    subtree, so "Main Wallet" was all a reader got — never the fiat total,
 *    the native amount or the custody kind.
 * 5. **A press is a state layer, the skeleton is opaque, and the chip clears
 *    44.** The chip was a ~28px pill, the skeleton a `bg-neutral-100` ramp
 *    step, and a copy with no confirmation left the user guessing — the
 *    address is now confirmed in a polite live region.
 */
exports.WalletCardV4 = React.forwardRef(function WalletCardV4({ address, label = 'Wallet', balanceCents, currency = 'USD', nativeAmount, nativeSymbol, nativeDecimals = 4, kind, variant = 'elevated', loading = false, onCopy, onClick, copyLabel = 'Copy address', copiedLabel = 'Address copied', addressLead = 8, className, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [copied, setCopied] = React.useState(false);
    React.useEffect(() => {
        if (!copied)
            return undefined;
        const timer = window.setTimeout(() => setCopied(false), COPIED_DWELL_MS);
        return () => window.clearTimeout(timer);
    }, [copied]);
    const short = (0, format_1.truncateHash)(address, addressLead, 4);
    const kindMeta = kind ? KIND_META[kind] : undefined;
    const interactive = onClick != null && !loading;
    const nativeText = nativeAmount != null
        ? (0, format_1.formatToken)(nativeAmount, { decimals: nativeDecimals, symbol: nativeSymbol })
        : undefined;
    // The same variant the native twin resolves: `accent` is `elevated` plus a
    // tint, not a third card treatment.
    const cardVariant = variant === 'accent' ? 'elevated' : variant;
    const identity = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-card", children: label }), kindMeta ? ((0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { tone: kindMeta.tone, ...market_v4_1.BADGE_V4, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: kindMeta.glyph }), " ", kindMeta.label] })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-xs", children: [balanceCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "xl" })) : null, nativeText != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-muted-text', market_v4_1.TABULAR_CLASS), children: nativeText })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: cardVariant, className: (0, cn_1.cn)('flex flex-col gap-md', className), style: variant === 'accent'
            ? { backgroundColor: (0, tone_v4_1.toneGround)('primary'), ...style }
            : style, ...rest, children: [loading ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": "polite", "aria-label": "Loading balance", className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-2/5', market_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-xl w-3/5', market_v4_1.PLACEHOLDER_CLASS) })] })) : interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, market_v4_1.spokenLine)([
                    label,
                    balanceCents != null ? (0, money_1.formatMoney)(balanceCents, currency) : undefined,
                    nativeText,
                    kindMeta?.label,
                ]), onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('flex w-full flex-col gap-sm rounded-[var(--xen-radius-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: identity })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: identity })), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": (0, market_v4_1.spokenLine)([copyLabel, short]), onClick: onCopy
                    ? () => {
                        onCopy(address);
                        setCopied(true);
                    }
                    : undefined, disabled: !onCopy, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('inline-flex items-center gap-xs self-start rounded-[var(--xen-radius-full)]', 'border border-border px-md', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS, v4_state_1.V4_DISABLED_CLASS), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-on-card', market_v4_1.TABULAR_CLASS), children: short }), onCopy ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs text-muted-text", children: "\u29C9" })) : null] }), (0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: "sr-only", children: copied ? copiedLabel : '' })] }));
});
//# sourceMappingURL=WalletCardV4.js.map