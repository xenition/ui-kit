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
exports.EventCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
/**
 * EventCard — **horizontal media-left row** alternate design (web / React DOM).
 *
 * A dense list row: a square cover thumbnail on the left carries a floating
 * token date block, and a text column on the right holds the category badge,
 * title, and time / location / attendee meta. Far denser and more list-friendly
 * than the base vertical card, and distinct from its cover-less `compact` row
 * (this keeps the media). Same props as {@link EventCard} — a drop-in swap.
 * Token-pure.
 */
exports.EventCardV3 = React.forwardRef(function EventCardV3({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant = 'default', loading = false, onClick, onKeyDown, className, ...rest }, ref) {
    const isFeatured = variant === 'featured';
    const clickable = typeof onClick === 'function';
    const mediaClass = isFeatured ? 'h-28 w-28' : 'h-24 w-24';
    const container = (0, cn_1.cn)('flex flex-row overflow-hidden rounded-lg border border-border bg-surface text-on-surface', clickable &&
        'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading event", "aria-busy": "true", className: container, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('shrink-0 animate-pulse bg-neutral-200 motion-reduce:animate-none', mediaClass) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col justify-center gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-7/12 animate-pulse rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-5/12 animate-pulse rounded-sm bg-neutral-100" })] })] }));
    }
    const metaLine = [time, location].filter(Boolean).join(' · ');
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: container, onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? title : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative shrink-0 bg-neutral-100', mediaClass), children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9F\uFE0F", size: "xl", "aria-label": imageAlt ?? title }) })), date ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-x-xs bottom-xs truncate rounded-sm bg-surface px-xs py-px text-center text-xs font-extrabold tracking-wide text-primary shadow-sm", children: date })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col justify-center gap-xs p-md", children: [category ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", size: "sm", children: category }) })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "line-clamp-2 font-heading text-base font-bold text-on-surface", children: title }), metaLine ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-1 text-sm text-muted", children: metaLine }) : null, typeof attendeeCount === 'number' ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs text-xs text-muted", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC65", size: "sm", color: "muted" }), `${attendeeCount} going`] })) : null] })] }));
});
//# sourceMappingURL=EventCardV3.js.map