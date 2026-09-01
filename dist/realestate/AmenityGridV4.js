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
exports.AmenityGridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * AmenityGrid — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the amenity grid: each amenity is a soft-primary
 * tinted glyph disc above an airy label, wrapping responsively into a clean grid.
 * ONE accent = primary; unavailable amenities read muted with a struck label and a
 * dashed disc. Same props/behavior as {@link AmenityGridProps}; `columns` sets the
 * layout width and an empty list degrades to the shared `EmptyState`. All colors
 * come from the `--xen-*` token classes (no literals); each tile carries an a11y label.
 */
exports.AmenityGridV4 = React.forwardRef(function AmenityGridV4({ amenities, columns = 2, emptyLabel = 'No amenities listed', className, style, ...rest }, ref) {
    if (amenities.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyLabel, description: "Amenity details will appear here.", className: className }));
    }
    const cols = Math.max(1, columns);
    return ((0, jsx_runtime_1.jsx)("ul", { ref: ref, className: (0, cn_1.cn)('grid list-none gap-2 p-0', className), style: { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, ...style }, ...rest, children: amenities.map((a, i) => {
            const available = a.available !== false;
            return ((0, jsx_runtime_1.jsxs)("li", { "aria-label": `${a.label}, ${available ? 'available' : 'not available'}`, className: (0, cn_1.cn)('flex flex-col items-center gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 text-center shadow-sm', !available && 'opacity-60'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full text-lg', available ? 'bg-primary/10 text-on-surface' : 'border border-dashed border-border bg-transparent text-muted'), children: a.glyph ?? (available ? '✓' : '—') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-full truncate text-sm font-medium', available ? 'text-on-surface' : 'text-muted line-through'), children: a.label })] }, `${a.label}-${i}`));
        }) }));
});
//# sourceMappingURL=AmenityGridV4.js.map