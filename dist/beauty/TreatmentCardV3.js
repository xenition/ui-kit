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
exports.TreatmentCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const GLYPH = { facial: '🧖', massage: '💆', body: '🌿', nails: '💅', hair: '💇', wellness: '🧘' };
/**
 * TreatmentCard, redesigned (v3): a **dense treatment row**. A category glyph tile,
 * the name over a category·duration·description line, the price, and a compact Book
 * — hairline-bordered for a menu list. The opposite of v2's media hero. Same props,
 * token-only.
 */
exports.TreatmentCardV3 = React.forwardRef(function TreatmentCardV3({ name, priceCents, currency = 'USD', variant = 'wellness', durationMin, description, imageUrl, formatMoney, bookLabel = 'Book', onBook, onClick, className, ...rest }, ref) {
    void imageUrl;
    const fmt = formatMoney ?? commerce_1.formatMoney;
    const interactive = typeof onClick === 'function';
    const sub = [typeof durationMin === 'number' ? `${durationMin} min` : null, description].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-treatment-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-lg", "aria-hidden": true, children: GLYPH[variant] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: fmt(priceCents, currency) }), onBook ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: (e) => { e.stopPropagation(); onBook(); }, children: bookLabel }) : null] }));
});
//# sourceMappingURL=TreatmentCardV3.js.map