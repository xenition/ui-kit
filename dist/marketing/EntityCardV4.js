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
exports.EntityCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Eyebrow_1 = require("../primitives/Eyebrow");
const GenerativeCover_1 = require("./GenerativeCover");
/**
 * EntityCard — **V4** "showcase" design (web parity of the native V4). The
 * generic content/entity card re-skinned as an image-forward showcase card: a
 * floating rounded media frame (an `<img>` when `media.imageUrl` is set, else a
 * seeded {@link GenerativeCover}; a soft-primary well with a glyph when no media
 * is given at all), the `eyebrow` as a soft-primary chip, a bold tight-tracked
 * `title`, muted `description`, an emphasized `meta` line, a corner `badge`, and
 * a `footer` slot — all on a clean elevated surface (NO brand gradient). The
 * base's `href` still stretches a link across the whole card. Honors every base
 * prop; token-only colors, no literals.
 */
exports.EntityCardV4 = React.forwardRef(function EntityCardV4({ title, eyebrow, description, meta, media, badge, footer, href, className, ...rest }, ref) {
    const mediaBox = media ? ((0, jsx_runtime_1.jsx)("div", { className: "aspect-[var(--xen-entity-aspect)] overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", style: { '--xen-entity-aspect': String(media.aspect ?? 1.6) }, children: media.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: media.imageUrl, alt: title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: media.seed ?? title, label: title, form: media.form, ink: media.ink, paper: media.paper, className: "h-full w-full" })) })) : (
    // No media descriptor at all — a soft-primary well with a glyph.
    (0, jsx_runtime_1.jsx)("div", { className: "flex aspect-[1.6] items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-primary/[0.08] text-primary", children: (0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("rect", { x: "3", y: "3", width: "18", height: "18", rx: "3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M21 15l-5-5L5 21" })] }) }));
    const heading = ((0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-extrabold leading-snug tracking-tight text-on-surface", children: href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "hover:text-primary after:absolute after:inset-0 after:content-['']", children: title })) : (title) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-entity-card": "", className: (0, cn_1.cn)('relative flex flex-col gap-[var(--xen-space-sm)]', 'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm', 'transition-shadow duration-300 hover:shadow-md', className), ...rest, children: [badge ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-entity-badge": "", className: "absolute right-[var(--xen-space-md)] top-[var(--xen-space-md)] z-10", children: badge })) : null, href && media ? ((0, jsx_runtime_1.jsx)("a", { href: href, "aria-label": title, className: "block", children: mediaBox })) : (mediaBox), eyebrow ? ((0, jsx_runtime_1.jsx)("span", { className: "w-fit rounded-[var(--xen-radius-full)] bg-primary/10 px-[var(--xen-space-sm)] py-[2px]", children: (0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { children: eyebrow }) })) : null, heading, description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed text-muted", children: description }) : null, meta ? ((0, jsx_runtime_1.jsx)("p", { "data-xen-entity-meta": "", className: "text-sm font-medium text-on-surface", children: meta })) : null, footer ? (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xs)]", children: footer }) : null] }));
});
//# sourceMappingURL=EntityCardV4.js.map