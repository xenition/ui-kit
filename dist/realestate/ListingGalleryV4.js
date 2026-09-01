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
exports.ListingGalleryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * ListingGallery — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a listing gallery: a big rounded hero photo
 * with a bottom gradient scrim, a near-white "n / total" counter overlaid on the
 * scrim, prev/next controls, and a rounded thumbnail strip that also drives the
 * active index. Works uncontrolled, or drive it with `index`. Data only: URLs
 * in, an `onIndexChange` callback out; nothing fetches. On an empty `images`
 * array it renders the shared `EmptyState`. All colors from `--xen-*` token
 * classes (no literals).
 */
exports.ListingGalleryV4 = React.forwardRef(function ListingGalleryV4({ images, height = 220, index, onIndexChange, emptyLabel = 'No photos yet', className, ...rest }, ref) {
    const [internal, setInternal] = React.useState(0);
    if (images.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: emptyLabel, description: "Photos will appear here once uploaded.", className: className }));
    }
    const active = index ?? internal;
    const current = Math.min(Math.max(active, 0), images.length - 1);
    const go = (next) => {
        const clamped = Math.min(Math.max(next, 0), images.length - 1);
        if (clamped === current)
            return;
        setInternal(clamped);
        onIndexChange?.(clamped);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { role: "group", "aria-roledescription": "carousel", "aria-label": `Listing photo ${current + 1} of ${images.length}`, className: "relative overflow-hidden rounded-[var(--xen-radius-lg)] bg-on-surface/10 shadow-md", children: [(0, jsx_runtime_1.jsx)("img", { src: images[current], alt: `Photo ${current + 1}`, style: { height }, className: "w-full object-cover" }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-on-surface/70 to-transparent" }), images.length > 1 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous photo", onClick: () => go(current - 1), className: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-surface px-2 py-1 text-on-surface hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary", children: "\u2039" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next photo", onClick: () => go(current + 1), className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-surface px-2 py-1 text-on-surface hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary", children: "\u203A" })] })) : null, (0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-2 left-3 text-sm font-bold text-on-primary", children: `${current + 1} / ${images.length}` })] }), images.length > 1 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 overflow-x-auto", children: images.map((src, i) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Go to photo ${i + 1}`, "aria-current": i === current, onClick: () => go(i), className: (0, cn_1.cn)('h-14 w-20 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] border transition-opacity focus:outline-none focus:ring-2 focus:ring-primary', i === current ? 'border-primary opacity-100' : 'border-border opacity-70 hover:opacity-100'), children: (0, jsx_runtime_1.jsx)("img", { src: src, alt: "", "aria-hidden": "true", className: "h-full w-full object-cover" }) }, `${src}-${i}`))) })) : null] }));
});
//# sourceMappingURL=ListingGalleryV4.js.map