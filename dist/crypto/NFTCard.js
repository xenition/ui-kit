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
exports.NFTCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const NetworkBadge_1 = require("./NetworkBadge");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/**
 * A collectible tile: artwork (or a token-bound `No image` placeholder), name,
 * collection, an optional chain {@link NetworkBadge}, and a floor price
 * (fixed-precision — no float drift). `grid` stacks the media over the meta;
 * `list` places a thumbnail beside it. Handles a `loading` skeleton and a
 * missing image gracefully. Web parity of the native `NFTCard`.
 */
exports.NFTCard = React.forwardRef(function NFTCard({ name, collection, image, floorAmount, floorSymbol, floorDecimals = 3, network, variant = 'grid', loading = false, onClick, className, ...rest }, ref) {
    const isList = variant === 'list';
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const media = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100', isList ? 'h-16 w-16 shrink-0' : 'h-40 w-full'), children: loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading artwork", className: "h-full w-full animate-pulse bg-neutral-100" })) : image != null ? ((0, jsx_runtime_1.jsx)("img", { src: image, alt: name, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "No image" })) }));
    const meta = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-1', isList ? 'min-w-0 flex-1' : 'mt-[var(--xen-space-sm)]'), children: [collection != null ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: collection })) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [network != null ? (0, jsx_runtime_1.jsx)(NetworkBadge_1.NetworkBadge, { name: network, size: "sm" }) : (0, jsx_runtime_1.jsx)("span", {}), floorAmount != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Floor" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold tabular-nums text-on-surface", children: (0, format_1.formatToken)(floorAmount, { decimals: floorDecimals, symbol: floorSymbol }) })] })) : null] })] }));
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, "aria-label": interactive ? (collection ? `${name}, ${collection}` : name) : undefined, className: (0, cn_1.cn)('p-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(isList ? 'flex items-center gap-[var(--xen-space-md)]' : 'flex flex-col'), children: [media, meta] }) }));
});
//# sourceMappingURL=NFTCard.js.map