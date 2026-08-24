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
exports.MediaFigure = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const aspect_1 = require("./aspect");
/**
 * A single media item with its caption — an image (or video) inside an
 * aspect-ratio box (from `width`/`height`, so no layout shift) and a
 * `<figcaption>`. Token-only. Lazy-loaded by default.
 */
exports.MediaFigure = React.forwardRef(function MediaFigure({ item, loading = 'lazy', reserveAspect = true, onActivate, className, ...rest }, ref) {
    const aspect = reserveAspect ? (0, aspect_1.aspectStyle)(item.width, item.height) : undefined;
    const media = item.kind === 'video' ? ((0, jsx_runtime_1.jsx)("video", { src: item.url, poster: item.poster, controls: true, preload: "metadata", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("img", { src: item.url, alt: item.alt ?? item.caption ?? '', loading: loading, width: item.width, height: item.height, className: "h-full w-full object-cover" }));
    const box = ((0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", style: aspect, children: onActivate ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onActivate, className: "block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", "aria-label": item.alt ?? item.caption ?? 'Open media', children: media })) : (media) }));
    return ((0, jsx_runtime_1.jsxs)("figure", { ref: ref, "data-xen-media-figure": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [box, item.caption ? ((0, jsx_runtime_1.jsx)("figcaption", { className: "text-sm leading-relaxed text-muted", children: item.caption })) : null] }));
});
//# sourceMappingURL=MediaFigure.js.map