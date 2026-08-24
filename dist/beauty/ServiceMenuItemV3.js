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
exports.ServiceMenuItemV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const GLYPH = { hair: '💇', nails: '💅', skin: '✨', massage: '💆', makeup: '💄', brows: '👁️', waxing: '🕯️', spa: '🧖' };
/**
 * ServiceMenuItem, redesigned (v3): a **menu line with a dotted leader**. The glyph
 * + name sit left, a dotted rule bridges to the price on the right, and the
 * duration/description fold into a quiet subtitle — a classic price-list row. The
 * opposite of v2's card. Same props, token-only.
 */
exports.ServiceMenuItemV3 = React.forwardRef(function ServiceMenuItemV3({ name, priceCents, currency = 'USD', category = 'spa', durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney, onClick, className, ...rest }, ref) {
    const fmt = formatMoney ?? commerce_1.formatMoney;
    const interactive = typeof onClick === 'function' && !unavailable;
    const sub = [description, typeof durationMin === 'number' ? `${durationMin} min` : null].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-service-menu-item": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('border-b border-border py-2.5', unavailable && 'opacity-50', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: GLYPH[category] }), (0, jsx_runtime_1.jsxs)("span", { className: "whitespace-nowrap text-sm font-semibold text-on-surface", children: [name, popular ? (0, jsx_runtime_1.jsx)("span", { className: "ml-1 text-accent", children: "\u2605" }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-border", "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("span", { className: "whitespace-nowrap text-sm font-bold text-on-surface", children: [pricePrefix ? `${pricePrefix} ` : '', fmt(priceCents, currency)] })] }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 truncate text-xs text-muted", children: sub }) : null] }));
});
//# sourceMappingURL=ServiceMenuItemV3.js.map