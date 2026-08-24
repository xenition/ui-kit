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
exports.NFTCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const NetworkBadge_1 = require("./NetworkBadge");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/**
 * NFTCard, redesigned (v3): a **grid tile with a bottom info strip**. The artwork
 * runs flush to the top corners as a square; a flat filled strip (neutral ramp)
 * below it — separated by a hairline — carries the name and, on its own line, the
 * collection (or network chip) with a right-aligned floor (fixed precision — no
 * float drift). No overlay, no shadow: a clean gallery tile that tessellates in a
 * grid. Distinct at a glance from the base's outlined card and v2's full-bleed
 * scrim. Same props; handles `loading` and a missing image.
 */
exports.NFTCardV3 = React.forwardRef(function NFTCardV3({ name, collection, image, floorAmount, floorSymbol, floorDecimals = 3, network, variant: _variant, loading = false, onClick, className, ...rest }, ref) {
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? (collection ? `${name}, ${collection}` : name) : undefined, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex aspect-square w-full items-center justify-center overflow-hidden bg-neutral-100", children: loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading artwork", className: "h-full w-full animate-pulse bg-neutral-100" })) : image != null ? ((0, jsx_runtime_1.jsx)("img", { src: image, alt: name, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "No image" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] border-t border-border bg-neutral-100 p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [network != null ? ((0, jsx_runtime_1.jsx)(NetworkBadge_1.NetworkBadge, { name: network, size: "sm" })) : collection != null ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted", children: collection })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex-1" })), floorAmount != null ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs font-semibold tabular-nums text-on-surface", children: (0, format_1.formatToken)(floorAmount, { decimals: floorDecimals, symbol: floorSymbol }) })) : null] })] })] }));
});
//# sourceMappingURL=NFTCardV3.js.map