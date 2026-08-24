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
exports.ListingGalleryV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * ListingGallery, redesigned (v3): a **minimal dot pager**. A single framed image
 * with tap zones on the left/right halves and a row of position dots beneath — no
 * thumbnails, no arrows. The compact counterpart to v2's hero strip. Same props,
 * token-only.
 */
exports.ListingGalleryV3 = React.forwardRef(function ListingGalleryV3({ images, height = 220, index, onIndexChange, emptyLabel = 'No photos', className, ...rest }, ref) {
    const [internal, setInternal] = React.useState(0);
    const active = Math.max(0, Math.min(images.length - 1, index ?? internal));
    if (images.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDFE0" }), title: emptyLabel, className: className, ...rest });
    }
    const go = (next) => {
        const clamped = (next + images.length) % images.length;
        if (index === undefined)
            setInternal(clamped);
        onIndexChange?.(clamped);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-listing-gallery": "", className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative overflow-hidden rounded-lg bg-neutral-100", style: { height }, children: [(0, jsx_runtime_1.jsx)("img", { src: images[active], alt: `Photo ${active + 1} of ${images.length}`, className: "h-full w-full object-cover" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous photo", onClick: () => go(active - 1), className: "absolute inset-y-0 left-0 w-1/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next photo", onClick: () => go(active + 1), className: "absolute inset-y-0 right-0 w-1/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center gap-1.5", children: images.map((_, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 rounded-full transition-all', i === active ? 'w-4 bg-primary' : 'w-1.5 bg-neutral-300'), "aria-hidden": true }, i))) })] }));
});
//# sourceMappingURL=ListingGalleryV3.js.map