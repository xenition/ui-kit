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
exports.WarehouseBin = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const BIN_META = {
    empty: { glyph: '▫', label: 'Empty', text: 'text-muted', bg: 'bg-muted' },
    partial: { glyph: '▤', label: 'Partial', text: 'text-primary', bg: 'bg-primary' },
    full: { glyph: '■', label: 'Full', text: 'text-success', bg: 'bg-success' },
    reserved: { glyph: '⏳', label: 'Reserved', text: 'text-accent', bg: 'bg-accent' },
    blocked: { glyph: '⛔', label: 'Blocked', text: 'text-danger', bg: 'bg-danger' },
};
/**
 * A warehouse bin / storage-location tile: the bin code + zone, a token fill bar
 * sized to `fill`, an item count, and an occupancy chip carried by a glyph +
 * word. Exposes a `progressbar` role with `aria-valuenow` for the fill so
 * fullness is announced, not color-inferred. Clickable when `onClick` is set.
 * All colors are theme tokens. Web parity of the native `WarehouseBin`.
 */
exports.WarehouseBin = React.forwardRef(function WarehouseBin({ code, zone, fill, itemCount, state = 'partial', selected = false, onClick, className, ...rest }, ref) {
    const meta = BIN_META[state] ?? BIN_META.partial;
    const pct = (0, internal_1.clampPct)(fill);
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : 'progressbar', tabIndex: interactive ? 0 : undefined, onClick: interactive?.onClick, onKeyDown: interactive?.onKeyDown, "aria-label": `Bin ${code}, ${meta.label}, ${pct}% full`, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, "aria-selected": selected, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border bg-surface p-[var(--xen-space-sm)]', selected ? 'border-primary' : 'border-border', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-bold text-on-surface", children: code }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', meta.text), children: meta.glyph })] }), zone ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: zone }) : null, (0, jsx_runtime_1.jsx)("div", { className: "h-1.5 overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', meta.bg), style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', meta.text), children: meta.label }), itemCount != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${itemCount} ${itemCount === 1 ? 'item' : 'items'}` })) : null] })] }));
});
//# sourceMappingURL=WarehouseBin.js.map