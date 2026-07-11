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
exports.VideoEmbed = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Detects a same-origin/file video URL that should use a native `<video>` element. */
function isFileSource(src) {
    return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(src);
}
/** Responsive 16:9 video wrapper with a poster + play affordance; `<iframe>` or `<video>` as appropriate. */
exports.VideoEmbed = React.forwardRef(function VideoEmbed({ src, title, poster, native, className, ...rest }, ref) {
    const useVideo = native ?? isFileSource(src);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-video-embed": "", className: (0, cn_1.cn)('relative aspect-video w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-950', className), ...rest, children: useVideo ? ((0, jsx_runtime_1.jsx)("video", { src: src, poster: poster, controls: true, playsInline: true, "aria-label": title, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("iframe", { src: src, title: title, loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, className: "absolute inset-0 h-full w-full border-0" }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-video-play": "", className: "pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary text-on-primary opacity-90", children: (0, jsx_runtime_1.jsx)("span", { className: "ml-0.5 text-2xl leading-none", children: "\u25B6" }) })] })) }));
});
//# sourceMappingURL=VideoEmbed.js.map