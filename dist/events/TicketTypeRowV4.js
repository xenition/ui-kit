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
exports.TicketTypeRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
const ROW_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 ticket-type row** — the web twin of the native `TicketTypeRowV4`, same
 * props as {@link TicketTypeRow} plus `lowStockAt`, `formatRemaining` and
 * `soldOutLabel`.
 *
 * ## Five changes
 *
 * 1. **Negative inventory is sold out, not purchasable.** `remaining === 0` is
 *    a strict test, so a tier oversold to `-3` was neither sold out *nor* low
 *    stock: the row rendered normal, enabled and priced, and `onSelect` fired.
 *    `remainingParts()` treats anything at or below zero as sold out.
 * 2. **`lowStockAt` replaces the hard-coded `<= 10`.** Ten is a sensible
 *    default for a club night and meaningless for a 40,000-seat stadium.
 * 3. **The row says how many are left.** Its name was `` `${name}, ${price}` ``
 *    — "2 left" is exactly the thing a buyer was not being told, and it is the
 *    thing that decides whether they buy now.
 * 4. **Disabled is 0.38 and press is a state layer.** `opacity-60` is an
 *    invented band, and `hover:bg-neutral-50` is a ramp step that mirrors under
 *    `[data-theme="dark"]` into a near-white plate on a dark sheet.
 * 5. **The row clears 44 and the radio indicator is one size on both twins**,
 *    composed from the spacing scale rather than `h-5 w-5` here and a different
 *    number there.
 */
exports.TicketTypeRowV4 = React.forwardRef(function TicketTypeRowV4({ name, price, description, remaining, soldOut, selected = false, onSelect, disabled = false, lowStockAt = 10, formatRemaining, soldOutLabel = 'Sold out', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const stock = (0, event_v4_1.remainingParts)(remaining, soldOut, lowStockAt);
    const isDisabled = disabled || stock.soldOut;
    const remainingText = stock.remaining != null && stock.lowStock
        ? (formatRemaining ?? ((n) => `${n} left`))(stock.remaining)
        : undefined;
    const scarcity = stock.soldOut ? soldOutLabel : remainingText;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", role: "radio", "aria-checked": selected, "aria-label": (0, event_v4_1.spokenLine)([name, price, description, scarcity]), disabled: isDisabled, onClick: isDisabled ? undefined : onSelect, "data-xen-v4-state": "", style: ROW_STATE, className: (0, cn_1.cn)('flex w-full flex-row items-center gap-md rounded-[var(--xen-radius-md)] p-md text-left', chrome_v4_1.MIN_TAP_CLASS, selected ? 'border-2 border-primary' : 'border border-border', 'bg-card text-on-card', v4_state_1.V4_DISABLED_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-card", children: name }), stock.soldOut ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "danger", children: soldOutLabel })) : remainingText ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...event_v4_1.BADGE_V4, tone: "warn", children: remainingText })) : null] }), description ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: description })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-on-card', event_v4_1.TABULAR_CLASS), children: price }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-lg w-lg shrink-0 items-center justify-center rounded-full border-2', selected ? 'border-primary' : 'border-border'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "h-sm w-sm rounded-full bg-primary" }) : null })] }));
});
//# sourceMappingURL=TicketTypeRowV4.js.map