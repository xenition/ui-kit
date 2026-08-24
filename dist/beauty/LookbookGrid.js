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
exports.LookbookGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * A masonry-style lookbook / gallery grid of style photos. Renders `items` in a
 * flex-wrap grid of `columns`; each tile shows the image with a caption band and
 * optional tag, and calls `onSelect(id)` on activation (keyboard supported). An
 * empty `items` array renders the shared `EmptyState`. Indices are guarded and
 * missing images degrade to a tinted placeholder. Token-only colors.
 */
exports.LookbookGrid = React.forwardRef(function LookbookGrid({ items, columns = 2, aspectRatio = 0.8, emptyLabel = 'No looks yet', onSelect, className, ...rest }, ref) {
    const cols = Math.max(1, Math.floor(columns));
    const widthPct = `${100 / cols}%`;
    if (!items.length) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "data-xen-lookbook-grid": "", icon: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDCF7" }), title: emptyLabel, className: className, ...rest }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-lookbook-grid": "", className: (0, cn_1.cn)('flex flex-wrap', className), ...rest, children: items.map((item, i) => {
            const interactive = !!onSelect;
            return ((0, jsx_runtime_1.jsx)("div", { style: { width: widthPct }, className: "p-[var(--xen-space-xs)]", children: (0, jsx_runtime_1.jsxs)("div", { "data-xen-look": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": item.label ?? `Look ${i + 1}`, onClick: interactive ? () => onSelect(item.id) : undefined, onKeyDown: interactive
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onSelect(item.id);
                            }
                        }
                        : undefined, style: { aspectRatio: String(aspectRatio) }, className: (0, cn_1.cn)('relative flex flex-col justify-end overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-neutral-100', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', interactive && 'cursor-pointer transition-opacity hover:opacity-90'), children: [item.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: item.imageUrl, alt: item.label ?? '', className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute inset-0 flex items-center justify-center text-xl", children: "\u2702\uFE0F" })), item.tag ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)] bg-on-surface px-[var(--xen-space-xs)] py-px text-xs font-bold text-surface opacity-80", children: item.tag })) : null, item.label ? ((0, jsx_runtime_1.jsx)("span", { className: "relative bg-on-surface p-[var(--xen-space-sm)] opacity-70", children: (0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm font-bold text-surface", children: item.label }) })) : null] }) }, item.id ?? i));
        }) }));
});
//# sourceMappingURL=LookbookGrid.js.map