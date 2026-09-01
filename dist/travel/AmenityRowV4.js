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
exports.AmenityRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * AmenityRow — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a property's amenities: each amenity leads with a small
 * brand-gradient glyph disc (the signature V4 touch), the name, and a trailing
 * availability indicator — a `✓` in `text-success` when offered, a muted `✕`
 * (with the label struck) when not, so availability never rides on color alone.
 * Honors `variant` — `list` stacks one disc-led row each; `wrap` lays the discs
 * out as inline chips. Renders an empty hint when the list is empty. Same
 * props/behavior as {@link AmenityRowProps}; all colors from `--xen-*` token
 * classes (no literal colors).
 */
exports.AmenityRowV4 = React.forwardRef(function AmenityRowV4({ amenities, variant = 'wrap', className, ...rest }, ref) {
    if (amenities.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-amenity-row": "", className: (0, cn_1.cn)('text-sm text-muted', className), ...rest, children: "No amenities listed." }));
    }
    if (variant === 'list') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-amenity-row": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: amenities.map((a, i) => {
                const available = a.available !== false;
                return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${a.label}, ${available ? 'available' : 'unavailable'}`, className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50', available ? '' : 'opacity-60'), children: a.glyph ?? (available ? '✓' : '✕') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', available ? 'text-on-surface' : 'text-muted line-through'), children: a.label }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', available ? 'text-success' : 'text-muted'), children: available ? '✓' : '✕' })] }, `${a.label}-${i}`));
            }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-amenity-row": "", className: (0, cn_1.cn)('flex flex-wrap gap-[var(--xen-space-sm)]', className), ...rest, children: amenities.map((a, i) => {
            const available = a.available !== false;
            return ((0, jsx_runtime_1.jsxs)("span", { "aria-label": `${a.label}, ${available ? 'available' : 'unavailable'}`, className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-border py-[var(--xen-space-xs)] pl-[var(--xen-space-xs)] pr-[var(--xen-space-sm)]', available ? '' : 'opacity-60'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-xs leading-none text-primary-50", children: a.glyph ?? (available ? '✓' : '✕') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', available ? 'text-on-surface' : 'text-muted line-through'), children: a.label })] }, `${a.label}-${i}`));
        }) }));
});
//# sourceMappingURL=AmenityRowV4.js.map