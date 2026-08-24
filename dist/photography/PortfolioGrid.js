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
exports.PortfolioGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const media_1 = require("../media");
const commerce_1 = require("../commerce");
const GRID_COLS = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};
/**
 * A photographer's portfolio grid — the entry surface for a body of work.
 * Wraps the media {@link Gallery} for the populated case (`grid` square tiles
 * or `masonry` intrinsic ratios, tappable when `onOpen` is set), and renders a
 * token-only skeleton while `loading` and an {@link EmptyState} when there are
 * no photos. Guarded indexing throughout; all colors trace to `--xen-*` tokens.
 */
exports.PortfolioGrid = React.forwardRef(function PortfolioGrid({ items, columns = 3, variant = 'grid', title, onOpen, loading = false, loadingCount = 6, emptyLabel = 'No photos yet', emptyDescription, className, ...rest }, ref) {
    const heading = title ? ((0, jsx_runtime_1.jsx)("h3", { "data-xen-portfolio-title": "", className: "font-heading text-lg font-semibold text-on-surface", children: title })) : null;
    const wrap = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-portfolio-grid": variant, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [heading, children] }));
    if (loading) {
        const count = Math.max(1, loadingCount);
        return wrap((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading photos", "aria-busy": "true", className: (0, cn_1.cn)('grid gap-[var(--xen-space-md)]', GRID_COLS[columns]), children: Array.from({ length: count }, (_, i) => i).map((i) => ((0, jsx_runtime_1.jsx)("div", { className: "aspect-square animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200" }, i))) }));
    }
    if (items.length === 0) {
        return wrap((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: emptyLabel, description: emptyDescription }));
    }
    return wrap((0, jsx_runtime_1.jsx)(media_1.Gallery, { items: items, columns: columns, variant: variant, onOpen: onOpen }));
});
//# sourceMappingURL=PortfolioGrid.js.map