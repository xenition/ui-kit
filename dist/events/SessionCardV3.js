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
exports.SessionCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const AvatarGroup_1 = require("../primitives/AvatarGroup");
const Icon_1 = require("../primitives/Icon");
/**
 * SessionCard — **dense schedule line** alternate design (web / React DOM).
 *
 * The time leads a single compact row, then the title with an inline track
 * badge, a small speaker cluster, a terse `taken/cap` seat count, and the
 * bookmark star at the trailing edge — one or two lines total, no abstract, no
 * meter bar. Sized for a packed agenda list; `highlight` adds a thin primary
 * left rail. Same props as {@link SessionCard} — a drop-in swap. Token-pure.
 */
exports.SessionCardV3 = React.forwardRef(function SessionCardV3({ title, time, room, track, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, variant = 'default', onClick, onKeyDown, className, ...rest }, ref) {
    const isHighlight = variant === 'highlight';
    const clickable = typeof onClick === 'function';
    const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
    const isFull = hasMeter && seatsTaken >= capacity;
    const metaLine = [time, room].filter(Boolean).join(' · ');
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-row items-stretch overflow-hidden rounded-md border bg-surface text-on-surface', isHighlight ? 'border-primary' : 'border-border', clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? title : undefined, ...rest, children: [isHighlight ? (0, jsx_runtime_1.jsx)("span", { className: "w-0.5 shrink-0 self-stretch bg-primary" }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-row items-center gap-sm px-md py-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-14 shrink-0 truncate text-sm font-extrabold text-on-surface", children: time ?? '—' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-shrink truncate text-base font-bold text-on-surface", children: title }), track ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: isHighlight ? 'primary' : 'neutral', size: "sm", children: track }) : null] }), metaLine ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: metaLine }) : null] }), speakers.length > 0 ? ((0, jsx_runtime_1.jsx)(AvatarGroup_1.AvatarGroup, { avatars: speakers.map((s) => ({ src: s.avatarUrl, name: s.name })), size: "xs", max: 2 })) : null, hasMeter ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-bold', isFull ? 'text-danger' : 'text-muted'), children: isFull ? 'Full' : `${seatsTaken}/${capacity}` })) : null, onBookmark ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": bookmarked, "aria-label": bookmarked ? 'Remove bookmark' : 'Bookmark session', onClick: (e) => {
                            e.stopPropagation();
                            onBookmark(!bookmarked);
                        }, className: "shrink-0 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: bookmarked ? '★' : '☆', size: "base", color: bookmarked ? 'primary' : 'muted' }) })) : null] })] }));
});
//# sourceMappingURL=SessionCardV3.js.map