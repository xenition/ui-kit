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
exports.DestinationCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * DestinationCard, redesigned (v2): a **full-bleed destination hero**. A big
 * tinted media panel with the glyph watermark, a corner badge, and the name/
 * country/tagline over a scrim, with a "from" price chip floating. Elevated,
 * hover-lift. Same props as {@link DestinationCard}, token-only.
 */
exports.DestinationCardV2 = React.forwardRef(function DestinationCardV2({ name, country, tagline, glyph = '📍', fromCents, currency = 'USD', badge, variant, onClick, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-destination-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('relative flex h-48 flex-col justify-end overflow-hidden rounded-lg bg-primary/10 shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "pointer-events-none absolute inset-0 flex items-center justify-center text-6xl opacity-40", "aria-hidden": true, children: glyph }), badge ? (0, jsx_runtime_1.jsx)("div", { className: "absolute left-2 top-2", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: badge }) }) : null, typeof fromCents === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "absolute right-2 top-2 rounded-full bg-surface/90 px-2 py-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "from " }), (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: fromCents, currency: currency, size: "sm" })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-gradient-to-t from-neutral-900/70 to-transparent p-3 pt-10", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-neutral-50", children: name }), country ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-200", children: country }) : null, tagline ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-xs text-neutral-300", children: tagline }) : null] })] }));
});
//# sourceMappingURL=DestinationCardV2.js.map