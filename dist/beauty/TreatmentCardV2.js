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
exports.TreatmentCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const META = {
    facial: { glyph: '🧖', label: 'Facial' }, massage: { glyph: '💆', label: 'Massage' }, body: { glyph: '🌿', label: 'Body' }, nails: { glyph: '💅', label: 'Nails' }, hair: { glyph: '💇', label: 'Hair' }, wellness: { glyph: '🧘', label: 'Wellness' },
};
/**
 * TreatmentCard, redesigned (v2): a **media-hero treatment card**. A tinted band
 * (or image) with the category glyph tops the name, a category·duration line, a
 * description, and a price + Book row. Elevated, hover-lift. Distinct from v1. Same
 * props, token-only.
 */
exports.TreatmentCardV2 = React.forwardRef(function TreatmentCardV2({ name, priceCents, currency = 'USD', variant = 'wellness', durationMin, description, imageUrl, formatMoney, bookLabel = 'Book', onBook, onClick, className, ...rest }, ref) {
    const m = META[variant] ?? META.wellness;
    const fmt = formatMoney ?? commerce_1.formatMoney;
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-treatment-card": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": interactive ? `Open ${name}` : name, onClick: interactive ? () => onClick?.() : undefined, disabled: !interactive, className: "relative flex h-24 items-center justify-center overflow-hidden bg-accent/10 text-4xl", children: imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover" }) : (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: m.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 p-md", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [m.label, typeof durationMin === 'number' ? ` · ${durationMin} min` : ''] })] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: description }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: fmt(priceCents, currency) }), onBook ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: onBook, children: bookLabel }) : null] })] })] }));
});
//# sourceMappingURL=TreatmentCardV2.js.map