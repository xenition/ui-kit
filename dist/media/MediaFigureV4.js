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
exports.MediaFigureV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const aspect_1 = require("./aspect");
/**
 * **V4 media figure** — the web twin of the native `MediaFigureV4`, same props
 * as {@link MediaFigure} plus `openLabel` and `videoLabel`.
 *
 * ## Four changes
 *
 * 1. **A video inside a press target is no longer a `<video controls>` inside
 *    a `<button>`.** That is nested interactive content: invalid HTML, and in
 *    practice clicking the play control also fired `onActivate`, so the user
 *    got a lightbox instead of playback. With `onActivate` the figure shows the
 *    **poster** and a play badge and hands the intent over; without it the
 *    figure *is* the player and keeps the full `<video controls>`.
 * 2. **The placeholder ground is `muted`, not `bg-neutral-100`** — a ramp step
 *    carries the light orientation in both schemes, so it was a pale rectangle
 *    on a dark page.
 * 3. **The caption takes `muted-text`**, the slot with a contrast promise.
 * 4. **Focus is the shared `--xen-ring`**, not `ring-primary-300`, so a
 *    keyboard user sees the same indicator here as on every other control.
 */
exports.MediaFigureV4 = React.forwardRef(function MediaFigureV4({ item, loading = 'lazy', reserveAspect = true, onActivate, openLabel = 'Open media', videoLabel = 'video', className, ...rest }, ref) {
    const aspect = reserveAspect ? (0, aspect_1.aspectStyle)(item.width, item.height) : undefined;
    const video = item.kind === 'video';
    const name = [item.alt ?? item.caption ?? openLabel, video ? videoLabel : null]
        .filter(Boolean)
        .join(', ');
    /*
      With a press handler the figure is a *link to* the media, so it shows a
      still. Without one the figure IS the media, so a video gets real controls.
      The two cannot be combined: a `<video controls>` inside a `<button>` is
      nested interactive content.
    */
    const still = video && !item.poster ? null : ((0, jsx_runtime_1.jsx)("img", { src: video ? item.poster : item.url, alt: item.alt ?? item.caption ?? '', loading: loading, width: item.width, height: item.height, className: "h-full w-full object-cover" }));
    const media = video && !onActivate ? ((0, jsx_runtime_1.jsx)("video", { src: item.url, poster: item.poster, controls: true, preload: "metadata", className: "h-full w-full object-cover" })) : (still);
    const box = ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-muted", style: aspect, children: [onActivate ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onActivate, "data-xen-v4-chrome": "on-surface", className: "block h-full w-full", "aria-label": name, children: media })) : (media), video && onActivate ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "pointer-events-none absolute flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--xen-on-surface)_55%,transparent)] text-surface", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u25B6", size: "lg" }) })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("figure", { ref: ref, "data-xen-media-figure": "", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [box, item.caption ? ((0, jsx_runtime_1.jsx)("figcaption", { className: "text-sm leading-relaxed text-muted-text", children: item.caption })) : null] }));
});
//# sourceMappingURL=MediaFigureV4.js.map