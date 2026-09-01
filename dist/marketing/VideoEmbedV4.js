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
exports.VideoEmbedV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Detects a same-origin/file video URL that should use a native `<video>` element. */
function isFileSource(src) {
    return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(src);
}
/**
 * VideoEmbed — **V4** "showcase" design (web parity of the native V4). A rounded,
 * elevated 16:9 media frame: an `<iframe>` embed (or a `<video>` element for a
 * file `src`/`native`) inside a soft-bordered, shadowed surface, with a refined
 * circular play affordance over embeds. The correct aspect ratio, `poster`,
 * accessible `title`, and iframe/video auto-detection are all preserved from the
 * base; only the skin changes. NOT a brand-gradient surface. Same props/behavior
 * as {@link VideoEmbedProps}; every color is a `--xen-*` token (`bg-surface`,
 * `bg-primary`, `text-on-primary`) — no literals.
 */
exports.VideoEmbedV4 = React.forwardRef(function VideoEmbedV4({ src, title, poster, native, className, ...rest }, ref) {
    const useVideo = native ?? isFileSource(src);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-video-embed": "", className: (0, cn_1.cn)('relative aspect-video w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm', className), ...rest, children: useVideo ? ((0, jsx_runtime_1.jsx)("video", { src: src, poster: poster, controls: true, playsInline: true, "aria-label": title, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("iframe", { src: src, title: title, loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, className: "absolute inset-0 h-full w-full border-0" }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-video-play": "", className: "pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--xen-radius-full)] border border-primary-50/30 bg-primary text-on-primary shadow-lg", children: (0, jsx_runtime_1.jsx)("span", { className: "ml-0.5 text-2xl leading-none", children: "\u25B6" }) })] })) }));
});
//# sourceMappingURL=VideoEmbedV4.js.map