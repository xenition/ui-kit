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
exports.SessionCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const AvatarGroup_1 = require("../primitives/AvatarGroup");
const Icon_1 = require("../primitives/Icon");
/**
 * SessionCard — **timeline card** alternate design (web / React DOM).
 *
 * A fixed left gutter renders the session time above a node dot and a vertical
 * connector, so a stack of these reads as an agenda rail. The elevated body on
 * the right keeps the track badge, title, room, abstract, speaker cluster and
 * the seat-capacity meter. `highlight` fills the node and tints the body with
 * the primary token. Same props as {@link SessionCard} — a drop-in swap.
 * Token-pure.
 */
exports.SessionCardV2 = React.forwardRef(function SessionCardV2({ title, time, room, track, abstract, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, variant = 'default', onClick, onKeyDown, className, ...rest }, ref) {
    const isHighlight = variant === 'highlight';
    const clickable = typeof onClick === 'function';
    const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
    const fillRatio = hasMeter ? Math.max(0, Math.min(1, seatsTaken / capacity)) : 0;
    const isFull = hasMeter && seatsTaken >= capacity;
    const speakerNames = speakers.map((s) => s.name).join(', ');
    const handleKeyDown = (e) => {
        onKeyDown?.(e);
        if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
            e.preventDefault();
            e.currentTarget.click();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-row gap-sm bg-transparent', clickable && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), onClick: onClick, onKeyDown: clickable ? handleKeyDown : onKeyDown, role: clickable ? 'button' : undefined, tabIndex: clickable ? 0 : undefined, "aria-label": clickable ? title : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-16 shrink-0 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-center text-sm font-extrabold text-on-surface", children: time ?? '—' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-sm h-3.5 w-3.5 rounded-full border-2', isHighlight ? 'border-primary bg-primary' : 'border-border bg-surface') }), (0, jsx_runtime_1.jsx)("span", { className: "mt-xs w-0.5 flex-1 bg-border" })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-sm rounded-md p-md shadow-sm transition duration-200', isHighlight ? 'bg-primary/5' : 'bg-surface', clickable && 'hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-start gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [track ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: isHighlight ? 'primary' : 'neutral', children: track }) })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-bold text-on-surface", children: title }), room ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: room }) : null] }), onBookmark ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": bookmarked, "aria-label": bookmarked ? 'Remove bookmark' : 'Bookmark session', onClick: (e) => {
                                    e.stopPropagation();
                                    onBookmark(!bookmarked);
                                }, className: "p-xs transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: bookmarked ? '★' : '☆', size: "lg", color: bookmarked ? 'primary' : 'muted' }) })) : null] }), abstract ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm text-on-surface", children: abstract }) : null, speakers.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(AvatarGroup_1.AvatarGroup, { avatars: speakers.map((s) => ({ src: s.avatarUrl, name: s.name })), size: "sm", max: 3 }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-sm text-muted", children: speakerNames })] })) : null, hasMeter ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1.5 overflow-hidden rounded-full bg-neutral-200", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', isFull ? 'bg-danger' : 'bg-primary'), style: { width: `${Math.round(fillRatio * 100)}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', isFull ? 'text-danger' : 'text-muted'), children: isFull ? 'Session full' : `${seatsTaken} / ${capacity} seats taken` })] })) : null] })] }));
});
//# sourceMappingURL=SessionCardV2.js.map