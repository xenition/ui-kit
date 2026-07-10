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
exports.EntityCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Eyebrow_1 = require("../primitives/Eyebrow");
const GenerativeCover_1 = require("./GenerativeCover");
/**
 * A generic content/entity card — the single component that collapses the
 * templates' bespoke `PostCard` / `ServiceCard` / `SpeakerCard` /
 * `ListingCard` / `ProgramCard` into props. Composes the kit `Card` with an
 * inset media frame (an `<img>` when `media.imageUrl` is set, else a seeded
 * {@link GenerativeCover}), an optional `Eyebrow`, the `title` heading, an
 * optional `description`, a `meta` line, an optional corner `badge`, and a
 * `footer` slot. Token-only; the same card expresses a blog post, a service, a
 * speaker, a listing, or a program by props alone.
 */
exports.EntityCard = React.forwardRef(function EntityCard({ title, eyebrow, description, meta, media, badge, footer, href, className, ...rest }, ref) {
    const mediaBox = media ? ((0, jsx_runtime_1.jsx)("div", { className: "aspect-[var(--xen-entity-aspect)] overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", style: { '--xen-entity-aspect': String(media.aspect ?? 1.6) }, children: media.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: media.imageUrl, alt: title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: media.seed ?? title, label: title, className: "h-full w-full" })) })) : null;
    const heading = ((0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-semibold leading-snug text-on-surface", children: href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "hover:text-primary", children: title })) : (title) }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-entity-card": "", className: (0, cn_1.cn)('relative flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [badge ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-entity-badge": "", className: "absolute right-[var(--xen-space-md)] top-[var(--xen-space-md)] z-10", children: badge })) : null, mediaBox ? (href ? ((0, jsx_runtime_1.jsx)("a", { href: href, "aria-label": title, className: "block", children: mediaBox })) : (mediaBox)) : null, eyebrow ? (0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { children: eyebrow }) : null, heading, description ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed text-muted", children: description })) : null, meta ? ((0, jsx_runtime_1.jsx)("p", { "data-xen-entity-meta": "", className: "text-sm font-medium text-on-surface", children: meta })) : null, footer ? (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xs)]", children: footer }) : null] }));
});
//# sourceMappingURL=EntityCard.js.map