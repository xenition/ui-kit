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
exports.VenueCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Rating_1 = require("../primitives/Rating");
/**
 * Venue summary — a photo (or token placeholder), name, address, and optional
 * capacity / rating / distance meta. `compact` removes the media for dense
 * lists. Passing `onClick` makes the whole card an accessible button; a separate
 * `onDirections` renders a nested directions button (its clicks don't trigger
 * the card). Colors come from the `--xen-*` tokens; no literal colors.
 */
exports.VenueCard = React.forwardRef(function VenueCard({ name, address, distance, capacity, rating, imageUrl, imageAlt, variant = 'default', onDirections, onClick, onKeyDown, className, ...rest }, ref) {
    const isCompact = variant === 'compact';
    const clickable = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-lg border border-border bg-surface text-on-surface', isCompact ? 'flex flex-row' : 'flex flex-col', clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? name : undefined, ...rest, children: [!isCompact ? ((0, jsx_runtime_1.jsx)("div", { className: "h-28 w-full bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? name, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDDFA\uFE0F", size: "2xl", "aria-label": imageAlt ?? name }) })) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs p-md", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), address ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs truncate text-sm text-muted", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCCD", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate", children: address })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row flex-wrap items-center gap-md", children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, typeof capacity === 'number' ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `Seats ${capacity}` }) : null, distance ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: distance }) : null] }), onDirections ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Directions to ${name}`, onClick: (e) => {
                            e.stopPropagation();
                            onDirections();
                        }, className: "mt-xs self-start text-sm font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Directions" })) : null] })] }));
});
//# sourceMappingURL=VenueCard.js.map