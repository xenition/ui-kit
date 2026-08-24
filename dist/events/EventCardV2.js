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
exports.EventCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
/**
 * EventCard — **full-bleed cover hero** alternate design (web / React DOM).
 *
 * Where the base card stacks a cover above a text body, V2 fills the whole card
 * with the image (or a token placeholder), floats a `surface` date chip top-left
 * and the category badge top-right, and rides the title + meta on a bottom
 * gradient scrim reversed out in `surface`. Elevated (shadow, no border),
 * media-forward. Same props as {@link EventCard} — a drop-in swap. Token-pure:
 * the scrim is a `neutral-900` → transparent gradient, every color a `--xen-*`.
 */
exports.EventCardV2 = React.forwardRef(function EventCardV2({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant = 'default', loading = false, onClick, onKeyDown, className, ...rest }, ref) {
    const isFeatured = variant === 'featured';
    const isCompact = variant === 'compact';
    const clickable = typeof onClick === 'function';
    const heightClass = isFeatured ? 'h-64' : isCompact ? 'h-40' : 'h-52';
    const container = (0, cn_1.cn)('relative flex flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 text-on-surface shadow-md', heightClass, clickable &&
        'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading event", "aria-busy": "true", className: container, ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 animate-pulse bg-neutral-200 motion-reduce:animate-none" }) }));
    }
    const metaLine = [time, location].filter(Boolean).join(' · ');
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: container, onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? title : undefined, ...rest, children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9F\uFE0F", size: "3xl", "aria-label": imageAlt ?? title }) })), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/25 to-transparent" }), date ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-md top-md rounded-md bg-surface px-sm py-xs text-sm font-bold text-on-surface shadow-sm", children: date })) : null, category ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute right-md top-md", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col gap-xs p-lg", children: [(0, jsx_runtime_1.jsx)("h3", { className: (0, cn_1.cn)('font-heading font-extrabold leading-tight text-surface', isFeatured ? 'text-2xl' : 'text-xl'), children: title }), metaLine ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-1 text-sm font-semibold text-surface/90", children: metaLine }) : null, typeof attendeeCount === 'number' ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs text-sm font-semibold text-surface/90", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC65", size: "sm" }), `${attendeeCount} going`] })) : null] })] }));
});
//# sourceMappingURL=EventCardV2.js.map