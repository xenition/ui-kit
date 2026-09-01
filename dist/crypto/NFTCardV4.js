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
exports.NFTCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const NetworkBadgeV4_1 = require("./NetworkBadgeV4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * **V4 NFT card** — the web twin of the native `NFTCardV4`, same props as
 * {@link NFTCard} plus `loadingLabel` and `floorLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is visible.** It was `bg-neutral-100` painted inside a box
 *    that was *also* `bg-neutral-100`, so the only thing separating "loading"
 *    from "empty frame" was the pulse — and under `prefers-reduced-motion`,
 *    nothing at all. The placeholder is now the shared opaque mix against the
 *    card's own ground, in a `role="status"` region rather than a bare
 *    `aria-label` on a `div` with no role.
 * 2. **The floor price never prints without a unit.** `floorSymbol` is
 *    optional and there was no fallback, so a collectible could advertise a
 *    floor of "0.85" of nothing. A floor with no ticker is not shown.
 * 3. **The card announces what it is holding.** `aria-label` carried the name
 *    and collection only, and replaced the subtree — so the network and the
 *    floor price, the two things a buyer is looking for, went unspoken.
 * 4. **`Card` takes the same treatment on both twins**, and a press is a state
 *    layer on a real `<button>` rather than `role="button"` plus a
 *    hand-written key handler on a `div`. The base also stacked its own `p-sm`
 *    class on top of `Card`'s `lg` padding and let stylesheet order pick the
 *    winner; `padding` is passed properly now.
 */
exports.NFTCardV4 = React.forwardRef(function NFTCardV4({ name, collection, image, floorAmount, floorSymbol, floorDecimals = 3, network, variant = 'grid', loading = false, onClick, loadingLabel = 'Loading artwork', floorLabel = 'Floor', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // A tile with nothing on it is the blank bordered box the line rules out.
    if (!name)
        return null;
    const isList = variant === 'list';
    const interactive = onClick != null && !loading;
    // A number with no unit is not a price.
    const floorText = floorAmount != null && floorSymbol
        ? (0, format_1.formatToken)(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })
        : undefined;
    const media = loading ? ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: (0, cn_1.cn)('animate-pulse', market_v4_1.PLACEHOLDER_CLASS, isList ? 'h-16 w-16 shrink-0' : 'h-40 w-full') })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)]', 'border border-border bg-card', isList ? 'h-16 w-16 shrink-0' : 'h-40 w-full'), children: image != null ? ((0, jsx_runtime_1.jsx)("img", { src: image, alt: name, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: "No image" })) }));
    const meta = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-xs', isList ? 'min-w-0 flex-1' : 'mt-sm'), children: [collection != null ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: collection })) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [network != null ? (0, jsx_runtime_1.jsx)(NetworkBadgeV4_1.NetworkBadgeV4, { name: network, size: "sm" }) : (0, jsx_runtime_1.jsx)("span", {}), floorText != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: floorLabel }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', market_v4_1.TABULAR_CLASS), children: floorText })] })) : null] })] }));
    const layout = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(isList ? 'flex items-center gap-md' : 'flex flex-col'), children: [media, meta] }));
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, variant: "outlined", padding: "sm", className: className, ...rest, children: interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, market_v4_1.spokenLine)([name, collection, network, floorText ? `${floorLabel} ${floorText}` : undefined]), onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('block w-full rounded-[var(--xen-radius-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: layout })) : (layout) }));
});
//# sourceMappingURL=NFTCardV4.js.map