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
exports.Avatar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const SIZE = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-[72px] w-[72px] text-xl',
};
/** Box dimensions only (for the positioning wrapper when a status dot is shown). */
const BOX = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-[72px] w-[72px]',
};
const SHAPE = {
    circle: 'rounded-full',
    rounded: 'rounded-[var(--xen-radius-md)]',
    square: 'rounded-[var(--xen-radius-sm)]',
};
const STATUS_DOT_COLOR = {
    online: 'bg-success',
    away: 'bg-warn',
    busy: 'bg-danger',
    offline: 'bg-muted',
};
const STATUS_RING_COLOR = {
    online: 'ring-success',
    away: 'ring-warn',
    busy: 'ring-danger',
    offline: 'ring-muted',
};
const DOT_SIZE = {
    xs: 'h-2 w-2',
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
    xl: 'h-4 w-4',
};
function initials(name) {
    if (!name)
        return '?';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}
/**
 * User avatar — image with an initials fallback, bound to the theme tokens. The
 * default (`md`, `circle`, no status, no ring) renders exactly as before; the
 * extended `xs`/`xl` sizes, `shape`, a `status` presence dot, and a `ring` are
 * additive opt-ins mirroring the native `Avatar`. No literal colors.
 */
exports.Avatar = React.forwardRef(function Avatar({ className, src, alt, name, size = 'md', shape = 'circle', status, ring = false, ...rest }, ref) {
    const inner = src ? ((0, jsx_runtime_1.jsx)("img", { src: src, alt: alt ?? name ?? '', className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { children: initials(name) }));
    // No status: keep the historical single-span structure (a status dot would be
    // clipped by `overflow-hidden`, so it opts into a positioning wrapper below).
    if (!status) {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center overflow-hidden', 'bg-primary-50 font-medium text-primary', SHAPE[shape], SIZE[size], ring && 'ring-2 ring-primary', className), ...rest, children: inner }));
    }
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, className: (0, cn_1.cn)('relative inline-flex shrink-0', BOX[size], className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-full w-full items-center justify-center overflow-hidden', 'bg-primary-50 font-medium text-primary', SHAPE[shape], SIZE[size], ring && (0, cn_1.cn)('ring-2', STATUS_RING_COLOR[status])), children: inner }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('absolute bottom-0 right-0 rounded-full border-2 border-surface', DOT_SIZE[size], STATUS_DOT_COLOR[status]) })] }));
});
//# sourceMappingURL=Avatar.js.map