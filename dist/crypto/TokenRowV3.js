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
exports.TokenRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/**
 * TokenRow, redesigned (v3): a **dense one-line quote**. A bold ticker leads, the
 * held quantity fills the middle (fixed precision — no float drift), and the 24h
 * change is pinned right in the `text-success`/`text-danger` slot with a ▲/▼ glyph
 * so it is never color-only. No disc, no card, no sparkline — a compact ticker
 * line that packs many rows on screen. Distinct at a glance from the base's
 * 40px-disc list and v2's card. Same props.
 */
exports.TokenRowV3 = React.forwardRef(function TokenRowV3({ symbol, name: _name, amount, decimals = 4, valueCents: _valueCents, currency: _currency, changePct, icon: _icon, iconColor: _iconColor, onClick, className, ...rest }, ref) {
    const hasChange = changePct != null;
    const toneKey = (0, format_1.changeToneKey)(changePct ?? 0);
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${symbol} holding` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "w-[68px] shrink-0 truncate text-sm font-bold text-on-surface", children: symbol }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm tabular-nums text-muted", children: (0, format_1.formatToken)(amount, { decimals, symbol }) }), hasChange ? ((0, jsx_runtime_1.jsxs)("span", { "aria-label": `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct ?? 0))}`, className: (0, cn_1.cn)('min-w-[78px] shrink-0 text-right text-sm font-bold tabular-nums', (0, format_1.changeToneClass)(toneKey)), children: [(0, format_1.changeGlyph)(changePct ?? 0), " ", (0, format_1.formatPct)(changePct ?? 0)] })) : null] }));
});
//# sourceMappingURL=TokenRowV3.js.map