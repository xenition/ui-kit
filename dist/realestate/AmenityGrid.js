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
exports.AmenityGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * Web parity of the native `AmenityGrid`: a grid of property amenities — each a
 * token-styled tile with an optional glyph, a check/dash availability marker, and
 * a struck label when the amenity is not offered. Presentational only (data in,
 * nothing fetches); degrades to the shared `EmptyState` when `amenities` is empty.
 * `columns` controls the layout width. All colors come from the `--xen-*` tokens
 * — no literal colors; each tile carries an a11y label.
 */
exports.AmenityGrid = React.forwardRef(function AmenityGrid({ amenities, columns = 2, emptyLabel = 'No amenities listed', className, style, ...rest }, ref) {
    if (amenities.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyLabel, description: "Amenity details will appear here.", className: className }));
    }
    const cols = Math.max(1, columns);
    return ((0, jsx_runtime_1.jsx)("ul", { ref: ref, className: (0, cn_1.cn)('grid list-none gap-2 p-0', className), style: { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, ...style }, ...rest, children: amenities.map((a, i) => {
            const available = a.available !== false;
            return ((0, jsx_runtime_1.jsxs)("li", { "aria-label": `${a.label}, ${available ? 'available' : 'not available'}`, className: (0, cn_1.cn)('flex items-center gap-2 border border-border bg-surface px-3 py-2', 'rounded-[var(--xen-radius-md)]', !available && 'opacity-60'), children: [a.glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: a.glyph, size: "base", color: available ? 'onSurface' : 'muted' }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: available ? '✓' : '—', size: "sm", color: available ? 'success' : 'muted' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 truncate text-sm', available ? 'text-on-surface' : 'text-muted line-through'), children: a.label })] }, `${a.label}-${i}`));
        }) }));
});
//# sourceMappingURL=AmenityGrid.js.map