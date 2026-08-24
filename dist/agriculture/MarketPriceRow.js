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
exports.MarketPriceRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DIR_META = {
    up: { glyph: '▲', text: 'text-success', sign: '+' },
    down: { glyph: '▼', text: 'text-danger', sign: '' },
    flat: { glyph: '▪', text: 'text-muted', sign: '' },
};
function deriveDirection(changePct) {
    if (typeof changePct !== 'number' || changePct === 0)
        return 'flat';
    return changePct > 0 ? 'up' : 'down';
}
/**
 * A market-price row — commodity glyph + name, the current price with unit, and
 * a change readout. The change carries a direction glyph (`▲`/`▼`/`▪`) and an
 * explicit sign alongside its color, so the movement reads without color alone.
 * `changePct` is guarded and the direction defaults to the sign of the change.
 * When `onClick` is set the row is an accessible `role="button"` with keyboard
 * activation. Token-bound throughout — no literal colors.
 */
exports.MarketPriceRow = React.forwardRef(function MarketPriceRow({ commodity, price, unit, changePct, direction, icon = '🌾', market, last = false, onClick, className, ...rest }, ref) {
    const dir = direction ?? deriveDirection(changePct);
    const meta = DIR_META[dir];
    const hasChange = typeof changePct === 'number';
    const changeText = hasChange
        ? `${meta.glyph} ${meta.sign}${Math.abs(changePct).toFixed(1)}%`
        : null;
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-market-price-row": "", className: (0, cn_1.cn)('flex items-center gap-2 py-2', !last && 'border-b border-border', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive
            ? `${commodity}, ${String(price)}${unit ? ` ${unit}` : ''}${changeText ? `, ${dir} ${Math.abs(changePct).toFixed(1)} percent` : ''}`
            : undefined, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "lg", color: "onSurface" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: commodity }), market != null ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: market }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsxs)("span", { className: "font-heading text-base font-bold text-on-surface", children: [String(price), unit != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-normal text-muted", children: [" ", unit] })) : null] }), changeText != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', meta.text), children: changeText })) : null] })] }));
});
//# sourceMappingURL=MarketPriceRow.js.map