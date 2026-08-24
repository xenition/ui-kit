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
exports.PortfolioGridV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * PortfolioGrid, redesigned (v3): a **dense contact sheet**. Uniform square
 * thumbnails pack tight in a fixed grid with a thin gap and no captions — a
 * scan-everything proof-sheet. The opposite of v2's masonry wall. Same props,
 * token-only.
 */
exports.PortfolioGridV3 = React.forwardRef(function PortfolioGridV3({ items, columns = 3, variant, title, onOpen, loading = false, loadingCount = 6, emptyLabel = 'No photos yet', emptyDescription, className, ...rest }, ref) {
    void variant;
    const colClass = columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-4' : 'grid-cols-3';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-portfolio-grid": "", "aria-busy": "true", className: (0, cn_1.cn)('grid gap-1', colClass, className), ...rest, children: Array.from({ length: loadingCount }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: "aspect-square animate-pulse rounded-sm bg-neutral-200" }, i))) }));
    }
    if (items.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCF7" }), title: emptyLabel, description: emptyDescription, className: className, ...rest });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-portfolio-grid": "", className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "text-sm font-bold text-on-surface", children: title }) : null, (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('grid gap-1', colClass), children: items.map((item, i) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": item.alt ?? item.caption ?? `Photo ${i + 1}`, onClick: () => onOpen?.(i), className: "aspect-square overflow-hidden rounded-sm bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)("img", { src: item.url, alt: item.alt ?? '', loading: "lazy", className: "h-full w-full object-cover" }) }, `${item.url}-${i}`))) })] }));
});
//# sourceMappingURL=PortfolioGridV3.js.map