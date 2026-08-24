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
exports.NFTCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const NetworkBadge_1 = require("./NetworkBadge");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/**
 * NFTCard, redesigned (v2): **full-bleed artwork with a scrim overlay**. The image
 * fills the whole tile; a bottom-up `neutral-900` → transparent gradient scrim
 * lets the collection, name, and floor sit over the art in near-white ramp ink
 * (readable in both themes), and the network chip floats top-right. The tile is
 * elevated (shadow) and lifts on hover. Floor is fixed-precision (no float
 * drift). Distinct at a glance from the base's media-over-meta stack. Same props;
 * handles `loading` and a missing image.
 */
exports.NFTCardV2 = React.forwardRef(function NFTCardV2({ name, collection, image, floorAmount, floorSymbol, floorDecimals = 3, network, variant: _variant, loading = false, onClick, className, ...rest }, ref) {
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const hasImage = !loading && image != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? (collection ? `${name}, ${collection}` : name) : undefined, className: (0, cn_1.cn)('relative flex h-56 flex-col justify-end overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-200 shadow-md', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...interactive, ...rest, children: [loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading artwork", className: "absolute inset-0 animate-pulse bg-neutral-100" })) : image != null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: image, alt: name, className: "absolute inset-0 h-full w-full object-cover" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/30 to-transparent" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center bg-neutral-100", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "No image" }) })), network != null ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(NetworkBadge_1.NetworkBadge, { name: network, size: "sm" }) })) : null, !loading ? ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col gap-0.5 p-[var(--xen-space-md)]", children: [collection != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs font-medium', hasImage ? 'text-neutral-100' : 'text-muted'), children: collection })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-base font-bold', hasImage ? 'text-neutral-50' : 'text-on-surface'), children: name }), floorAmount != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', hasImage ? 'text-neutral-100' : 'text-muted'), children: "Floor" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold tabular-nums', hasImage ? 'text-neutral-50' : 'text-on-surface'), children: (0, format_1.formatToken)(floorAmount, { decimals: floorDecimals, symbol: floorSymbol }) })] })) : null] })] })) : null] }));
});
//# sourceMappingURL=NFTCardV2.js.map