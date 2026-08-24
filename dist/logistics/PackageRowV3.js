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
exports.PackageRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * PackageRow, alternate design **V3** — an *ultra-dense single line*. A small
 * inline package glyph, the id, then `contents · weight · dims` collapsed into
 * one muted meta segment, and a trailing status glyph + word — all on one row
 * with no card chrome, tuned for long scannable manifests. Selection shows as a
 * leading token accent bar plus `aria-selected` (never color alone). Same props.
 */
exports.PackageRowV3 = React.forwardRef(function PackageRowV3({ packageId, contents, weight, weightUnit = 'kg', dimensions, status, selected = false, onClick, className, ...rest }, ref) {
    const meta = status ? internal_1.SHIPMENT_META[status] : undefined;
    const metaLine = [contents, weight != null ? (0, internal_1.formatWeight)(weight, weightUnit) : null, dimensions]
        .filter(Boolean)
        .join('  ·  ');
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Package ${packageId}${meta ? `, ${meta.label}` : ''}` : undefined, "aria-selected": interactive ? selected : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-xs)] py-[var(--xen-space-xs)]', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-[3px] self-stretch rounded-full', selected ? 'bg-primary' : 'bg-transparent') }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-muted", children: "\uD83D\uDCE6" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: packageId }), metaLine ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: metaLine }) : null] }), meta ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xs', internal_1.TONE_TEXT[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT[meta.tone]), children: meta.label })] })) : null] }));
});
//# sourceMappingURL=PackageRowV3.js.map