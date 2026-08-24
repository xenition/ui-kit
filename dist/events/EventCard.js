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
exports.EventCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
/**
 * Summary tile for a single event — the entry point of the events module.
 * Renders a cover (image or token placeholder), an optional category badge, the
 * title, and a date / time / location meta row. `variant` switches between a
 * full card, a `compact` list row (no cover), and a larger `featured`
 * treatment. Passing `onClick` makes the whole card an accessible button (role
 * + keyboard). All colors come from the `--xen-*` tokens — no literal colors.
 */
exports.EventCard = React.forwardRef(function EventCard({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant = 'default', loading = false, onClick, onKeyDown, className, ...rest }, ref) {
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const clickable = typeof onClick === 'function';
    const container = (0, cn_1.cn)('overflow-hidden rounded-lg border border-border bg-surface text-on-surface', isCompact ? 'flex flex-row' : 'flex flex-col', clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading event", className: container, ...rest, children: [!isCompact ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full animate-pulse bg-neutral-200', isFeatured ? 'h-48' : 'h-36') })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-5 w-8/12 animate-pulse rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-5/12 animate-pulse rounded-sm bg-neutral-100" })] })] }));
    }
    const metaLine = [date, time].filter(Boolean).join(' · ');
    const cover = !isCompact ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative w-full bg-neutral-100', isFeatured ? 'h-48' : 'h-36'), children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9F\uFE0F", size: "2xl", "aria-label": imageAlt ?? title }) })), category ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-sm top-sm", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) })) : null] })) : null;
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs p-md", children: [isCompact && category ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) })) : null, (0, jsx_runtime_1.jsx)("h3", { className: (0, cn_1.cn)('font-heading font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base'), children: title }), metaLine ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs text-sm text-muted", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDDD3\uFE0F", size: "sm", color: "muted" }), metaLine] })) : null, location ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs truncate text-sm text-muted", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCCD", size: "sm", color: "muted" }), location] })) : null, typeof attendeeCount === 'number' ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs text-sm text-muted", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC65", size: "sm", color: "muted" }), `${attendeeCount} going`] })) : null] }));
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: container, onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? title : undefined, ...rest, children: [cover, body] }));
});
//# sourceMappingURL=EventCard.js.map