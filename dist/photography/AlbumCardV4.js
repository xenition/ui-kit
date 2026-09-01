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
exports.AlbumCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * AlbumCard — **V4** "studio" design (web parity of the native V4). The matted,
 * image-forward take on an album tile: an elevated card whose cover photo floats
 * inside a thin neutral **mat**, a bold title, and the photo-count as a small
 * soft-primary chip with the date trailing. Honors all three `variant` layouts —
 * `cover` (matted photo on top), `list` (horizontal matted thumbnail), and
 * `compact` (dense) — identical props/behavior to {@link AlbumCardProps}. A
 * private album carries a labelled `Badge` (never color alone). All colors from
 * `--xen-*` token classes (no literals); `loading` shows a token-only skeleton;
 * `onClick` makes the whole card a keyboard-operable button.
 */
exports.AlbumCardV4 = React.forwardRef(function AlbumCardV4({ title, photoCount, dateText, coverUrl, isPrivate = false, variant = 'cover', loading = false, countLabel = 'photos', onClick, className, ...rest }, ref) {
    const horizontal = variant === 'list';
    const compact = variant === 'compact';
    const interactive = typeof onClick === 'function';
    const container = (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md', horizontal ? 'flex flex-row items-center gap-[var(--xen-space-md)]' : 'flex flex-col', interactive &&
        'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-album-card": "", "aria-label": "Loading album", "aria-busy": "true", className: container, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200', horizontal ? 'h-[88px] w-[88px] shrink-0' : compact ? 'h-24 w-full' : 'h-40 w-full') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] }));
    }
    // The matted photo: the cover sits inside a thin neutral mat with rounded corners.
    const mat = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset ring-border', horizontal ? 'h-[88px] w-[88px] shrink-0' : compact ? 'h-24 w-full' : 'h-44 w-full');
    const media = ((0, jsx_runtime_1.jsx)("div", { className: mat, children: coverUrl ? ((0, jsx_runtime_1.jsx)("img", { src: coverUrl, alt: title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-2xl text-muted", "aria-hidden": "true", children: "\uD83D\uDDBC" })) }));
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-[var(--xen-space-xs)]', horizontal ? '' : 'px-1 pb-1 pt-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "flex-1 truncate text-base font-bold text-on-surface", children: title }), isPrivate ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "warn", variant: "soft", children: "Private" }) : null] }), typeof photoCount === 'number' || dateText ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDDBC" }), photoCount, " ", countLabel] })) : null, dateText ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: dateText }) : null] })) : null] }));
    const label = `${title}${typeof photoCount === 'number' ? `, ${photoCount} ${countLabel}` : ''}${isPrivate ? ', private' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-album-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? label : undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: container, ...rest, children: [media, body] }));
});
//# sourceMappingURL=AlbumCardV4.js.map