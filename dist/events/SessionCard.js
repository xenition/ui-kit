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
exports.SessionCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const AvatarGroup_1 = require("../primitives/AvatarGroup");
const Icon_1 = require("../primitives/Icon");
/**
 * A rich conference session card: track badge, title, time / room meta, an
 * abstract, a speaker cluster, an optional seat-capacity meter, and a bookmark
 * toggle. `highlight` adds a primary left rail for keynotes. The bookmark state
 * uses a filled/outline glyph (★/☆) plus `aria-pressed`, and its clicks don't
 * trigger the card's `onClick`. Colors come from the `--xen-*` tokens; no
 * literal colors.
 */
exports.SessionCard = React.forwardRef(function SessionCard({ title, time, room, track, abstract, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, variant = 'default', onClick, onKeyDown, className, ...rest }, ref) {
    const isHighlight = variant === 'highlight';
    const clickable = typeof onClick === 'function';
    const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
    const fillRatio = hasMeter ? Math.max(0, Math.min(1, seatsTaken / capacity)) : 0;
    const isFull = hasMeter && seatsTaken >= capacity;
    const speakerNames = speakers.map((s) => s.name).join(', ');
    const metaLine = [time, room].filter(Boolean).join(' · ');
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-lg border bg-surface text-on-surface', isHighlight ? 'border-primary' : 'border-border', clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? title : undefined, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row", children: [isHighlight ? (0, jsx_runtime_1.jsx)("div", { className: "w-1 shrink-0 bg-primary" }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-sm p-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-start gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [track ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: isHighlight ? 'primary' : 'neutral', children: track }) })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-bold text-on-surface", children: title }), metaLine ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: metaLine }) : null] }), onBookmark ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": bookmarked, "aria-label": bookmarked ? 'Remove bookmark' : 'Bookmark session', onClick: (e) => {
                                        e.stopPropagation();
                                        onBookmark(!bookmarked);
                                    }, className: "p-xs transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: bookmarked ? '★' : '☆', size: "lg", color: bookmarked ? 'primary' : 'muted' }) })) : null] }), abstract ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm text-on-surface", children: abstract }) : null, speakers.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(AvatarGroup_1.AvatarGroup, { avatars: speakers.map((s) => ({ src: s.avatarUrl, name: s.name })), size: "sm", max: 3 }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-sm text-muted", children: speakerNames })] })) : null, hasMeter ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1.5 overflow-hidden rounded-full bg-neutral-200", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', isFull ? 'bg-danger' : 'bg-primary'), style: { width: `${Math.round(fillRatio * 100)}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', isFull ? 'text-danger' : 'text-muted'), children: isFull ? 'Session full' : `${seatsTaken} / ${capacity} seats taken` })] })) : null] })] }) }));
});
//# sourceMappingURL=SessionCard.js.map