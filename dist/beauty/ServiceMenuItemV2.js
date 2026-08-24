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
exports.ServiceMenuItemV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const META = {
    hair: { glyph: '💇', label: 'Hair', text: 'text-primary' }, nails: { glyph: '💅', label: 'Nails', text: 'text-accent' }, skin: { glyph: '✨', label: 'Skin', text: 'text-success' }, massage: { glyph: '💆', label: 'Massage', text: 'text-primary' }, makeup: { glyph: '💄', label: 'Makeup', text: 'text-danger' }, brows: { glyph: '👁️', label: 'Brows', text: 'text-accent' }, waxing: { glyph: '🕯️', label: 'Waxing', text: 'text-warn' }, spa: { glyph: '🧖', label: 'Spa', text: 'text-success' },
};
/**
 * ServiceMenuItem, redesigned (v2): an **elevated service card**. A category glyph
 * tile leads the name, a Popular flag, a description, and a duration; the price
 * (with prefix) sits prominent. Distinct from v1's row. Same props, token-only.
 */
exports.ServiceMenuItemV2 = React.forwardRef(function ServiceMenuItemV2({ name, priceCents, currency = 'USD', category = 'spa', durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney, onClick, className, ...rest }, ref) {
    const m = META[category] ?? META.spa;
    const fmt = formatMoney ?? commerce_1.formatMoney;
    const interactive = typeof onClick === 'function' && !unavailable;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-service-menu-item": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex gap-3 rounded-lg bg-surface p-3 shadow-sm', unavailable && 'opacity-50', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-xl", "aria-hidden": true, children: m.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: name }), popular ? (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent", children: "\u2605 Popular" }) : null] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: description }) : null, (0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('text-xs', m.text), children: [m.label, typeof durationMin === 'number' ? ` · ${durationMin} min` : ''] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [pricePrefix ? (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-muted", children: pricePrefix }) : null, (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: fmt(priceCents, currency) })] })] }));
});
//# sourceMappingURL=ServiceMenuItemV2.js.map