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
exports.PackageRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * PackageRow, alternate design **V2** — an *elevated package card*. Where the
 * classic is a flat dense row, V2 is a shadowed card: a large rounded package
 * glyph tile on the left, the id + contents stacked beside it, and the
 * weight/dimensions promoted into labelled metric pills on their own row. The
 * status is a glyph + word pill in the header corner. Selection is a full
 * primary ring plus `aria-selected`, never color alone. Same props. No literal
 * colors.
 */
exports.PackageRowV2 = React.forwardRef(function PackageRowV2({ packageId, contents, weight, weightUnit = 'kg', dimensions, status, selected = false, onClick, className, ...rest }, ref) {
    const meta = status ? internal_1.SHIPMENT_META[status] : undefined;
    const tint = meta ? internal_1.TONE_SOFT_BG[meta.tone] : 'bg-neutral-100';
    const glyphText = meta ? internal_1.TONE_TEXT[meta.tone] : 'text-muted';
    const hasMetrics = weight != null || dimensions;
    const interactive = (0, internal_1.pressableProps)(onClick);
    const Metric = ({ label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col rounded-[var(--xen-radius-md)] bg-neutral-100 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: value })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Package ${packageId}${meta ? `, ${meta.label}` : ''}` : undefined, "aria-selected": interactive ? selected : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-sm', selected && 'ring-2 ring-primary', interactive &&
            'cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-lg', tint, glyphText), children: "\uD83D\uDCE6" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: packageId }), contents ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: contents }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold', internal_1.TONE_SOFT_STRONG_BG[meta.tone], internal_1.TONE_TEXT[meta.tone]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })) : null] }), hasMetrics ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [weight != null ? (0, jsx_runtime_1.jsx)(Metric, { label: "Weight", value: (0, internal_1.formatWeight)(weight, weightUnit) }) : null, dimensions ? (0, jsx_runtime_1.jsx)(Metric, { label: "Dimensions", value: dimensions }) : null] })) : null] }));
});
//# sourceMappingURL=PackageRowV2.js.map