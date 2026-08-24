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
exports.AlbumCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A photo-album tile — cover image, title, photo count, and an optional date.
 * `variant` switches a full-bleed `cover` card, a horizontal `list` row, and a
 * dense `compact` tile. A private album shows a labelled `Badge` (never color
 * alone). Reuses the `Badge` primitive; passing `onClick` makes the whole card a
 * keyboard-operable `button`. Token-only — placeholder and surfaces are `--xen-*`.
 */
exports.AlbumCard = React.forwardRef(function AlbumCard({ title, photoCount, dateText, coverUrl, isPrivate = false, variant = 'cover', loading = false, countLabel = 'photos', onClick, className, ...rest }, ref) {
    const horizontal = variant === 'list';
    const interactive = typeof onClick === 'function';
    const container = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', horizontal
        ? 'flex flex-row items-center gap-[var(--xen-space-md)] p-[var(--xen-space-md)]'
        : 'flex flex-col', interactive &&
        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-album-card": "", "aria-label": "Loading album", "aria-busy": "true", className: container, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200', horizontal ? 'h-[88px] w-[88px] shrink-0' : 'h-40 w-full') }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-[var(--xen-space-sm)]', !horizontal && 'p-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] }));
    }
    const coverBox = (0, cn_1.cn)('overflow-hidden bg-neutral-100', horizontal
        ? 'h-[88px] w-[88px] shrink-0 rounded-[var(--xen-radius-md)]'
        : variant === 'compact'
            ? 'h-24 w-full'
            : 'h-40 w-full');
    const media = ((0, jsx_runtime_1.jsx)("div", { className: coverBox, children: coverUrl ? ((0, jsx_runtime_1.jsx)("img", { src: coverUrl, alt: title, loading: "lazy", className: "h-full w-full object-cover" })) : null }));
    const metaBits = [];
    if (typeof photoCount === 'number')
        metaBits.push(`${photoCount} ${countLabel}`);
    if (dateText)
        metaBits.push(dateText);
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-[var(--xen-space-xs)]', !horizontal && 'p-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "flex-1 truncate text-base font-bold text-on-surface", children: title }), isPrivate ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "warn", children: "Private" }) : null] }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: metaBits.join(' · ') })) : null] }));
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
//# sourceMappingURL=AlbumCard.js.map