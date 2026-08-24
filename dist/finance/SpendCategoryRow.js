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
exports.SpendCategoryRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Meter_1 = require("./internal/Meter");
const MoneyAmount_1 = require("./MoneyAmount");
const pressable_1 = require("./internal/pressable");
/**
 * A spend-by-category row: tinted glyph, category name over a share bar, and a
 * right-aligned amount + percentage. `share` is a `0–1` fraction (guarded and
 * clamped) that sizes the {@link Meter} and prints as a whole-percent chip; the
 * amount is neutral-toned integer cents. Fully token-bound. Web parity of the
 * native `SpendCategoryRow`.
 */
exports.SpendCategoryRow = React.forwardRef(function SpendCategoryRow({ category, amountCents, currency = 'USD', share, icon, color = 'primary', onClick, className, ...rest }, ref) {
    const clampedShare = typeof share === 'number' && Number.isFinite(share) ? Math.min(Math.max(share, 0), 1) : undefined;
    // `Icon` has no `accent` slot; fall back to `primary` for the glyph while
    // the bar keeps the requested color.
    const iconColor = color === 'accent' ? 'primary' : color;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? category : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [icon != null ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: iconColor, size: "xl" }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: category }), clampedShare != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [Math.round(clampedShare * 100), "%"] })) : null] }), clampedShare != null ? ((0, jsx_runtime_1.jsx)(Meter_1.Meter, { value: clampedShare * 100, color: color, "aria-label": `${category}, ${Math.round(clampedShare * 100)}% of spend` })) : null] }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: amountCents, currency: currency, tone: "neutral", size: "sm" })] }));
});
//# sourceMappingURL=SpendCategoryRow.js.map