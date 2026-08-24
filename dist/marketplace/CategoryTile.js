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
exports.CategoryTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * A tappable category entry for a marketplace browse grid — an icon glyph, a
 * label, and an optional listing count. `tile` (default) stacks the glyph over
 * the label as a square block; `chip` lays them out inline as a pill. The
 * `selected` state is carried by an accent ring + tinted surface and the
 * `aria-pressed` state (never color alone). Reuses `Icon`; token-only colors.
 */
exports.CategoryTile = React.forwardRef(function CategoryTile({ label, glyph, count, selected = false, variant = 'tile', onClick, className, ...rest }, ref) {
    const chip = variant === 'chip';
    const interactive = onClick != null;
    const countLabel = typeof count === 'number' ? `${count.toLocaleString()} items` : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                onClick,
                onKeyDown: internal_1.activateOnKey,
                'aria-pressed': selected,
                'aria-label': `${label}${countLabel ? `, ${countLabel}` : ''}`,
            }
            : {}), className: (0, cn_1.cn)('flex items-center justify-center rounded-[var(--xen-radius-lg)] border', chip
            ? 'flex-row gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]'
            : 'min-h-24 flex-col gap-[var(--xen-space-xs)] px-[var(--xen-space-sm)] py-[var(--xen-space-lg)]', selected ? 'border-primary bg-primary-50' : 'border-border bg-surface', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [glyph ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: chip ? 'base' : '2xl', color: selected ? 'primary' : 'onSurface' })) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col', chip ? 'items-start' : 'items-center'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', selected ? 'text-primary' : 'text-on-surface'), children: label }), countLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: countLabel }) : null] })] }));
});
//# sourceMappingURL=CategoryTile.js.map