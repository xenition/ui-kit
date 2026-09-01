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
exports.OddsBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
/** Format a decimal price for display, keeping two decimals. */
function formatPrice(v) {
    return Number.isFinite(v) ? v.toFixed(2) : '—';
}
/**
 * OddsBar — **V4** "broadcast" design. A three-segment odds split (home / draw /
 * away) as an elevated, evenly-divided bar. Each segment stacks a big price
 * numeral over a caption. Odds are **decimal prices**, so the **favourite is the
 * lowest price**: it is emphasized in the single `primary` accent. A `selected`
 * pick is filled in primary; when `onSelect` is given each segment is an
 * accessible ≥44px button reflecting its pressed state. All colors from
 * `--xen-*` token classes (no literals); dark-mode safe.
 */
exports.OddsBar = React.forwardRef(function OddsBar({ home, draw, away, homeLabel = 'Home', drawLabel = 'Draw', awayLabel = 'Away', onSelect, selected, className, ...rest }, ref) {
    const shell = (0, cn_1.cn)('flex items-stretch gap-1.5 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-1.5 text-on-surface shadow-sm', className);
    const segments = [
        { pick: 'home', price: home, label: homeLabel },
        { pick: 'draw', price: draw, label: drawLabel },
        { pick: 'away', price: away, label: awayLabel },
    ];
    // Favourite = lowest decimal price (most likely outcome).
    const min = Math.min(home, draw, away);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "group", "aria-label": "Match odds", className: shell, ...rest, children: segments.map(({ pick, price, label }) => {
            const isSelected = selected === pick;
            const isFav = price === min && Number.isFinite(price);
            const surface = isSelected
                ? 'bg-primary text-on-primary'
                : isFav
                    ? 'bg-primary/10 text-primary'
                    : 'bg-on-surface/5 text-on-surface';
            const priceCls = (0, cn_1.cn)('text-2xl font-extrabold leading-none', isSelected ? 'text-on-primary' : isFav ? 'text-primary' : 'text-on-surface');
            const labelCls = (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', isSelected ? 'text-on-primary' : 'text-muted');
            const a11y = `${label} ${formatPrice(price)}${isFav ? ', favourite' : ''}${isSelected ? ', selected' : ''}`;
            const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: priceCls, children: formatPrice(price) }), (0, jsx_runtime_1.jsx)("span", { className: labelCls, children: label })] }));
            if (onSelect) {
                return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 rounded-[var(--xen-radius-md)] px-2 py-2', surface, interactive_1.FOCUS_RING), "aria-pressed": isSelected, ...(0, interactive_1.tappableProps)(() => onSelect(pick), a11y), children: body }, pick));
            }
            return ((0, jsx_runtime_1.jsx)("div", { "aria-label": a11y, className: (0, cn_1.cn)('flex flex-1 flex-col items-center justify-center gap-1 rounded-[var(--xen-radius-md)] px-2 py-2', surface), children: body }, pick));
        }) }));
});
//# sourceMappingURL=OddsBar.js.map