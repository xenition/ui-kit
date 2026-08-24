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
exports.DriverRatingRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A rate-your-driver row — the driver identity plus a star control that fires
 * `onRate(stars)` when tapped. Interactive stars are real `<button>`s with per-
 * star a11y labels and an `aria-checked` state; when there is no `onRate` (or
 * `variant="readonly"`) it falls back to the read-only `Rating` primitive.
 * Colors come from `--xen-*` token classes — no literal colors. The star count
 * is clamped and indexing is guarded. Web parity of the native
 * `DriverRatingRow`.
 */
exports.DriverRatingRow = React.forwardRef(function DriverRatingRow({ driverName, avatarUrl, subtitle, value = 0, max = 5, onRate, variant = 'interactive', loading = false, className, ...rest }, ref) {
    const total = Math.max(1, Math.floor(Number.isFinite(max) ? max : 5));
    const filled = Math.max(0, Math.min(total, Math.round(Number.isFinite(value) ? value : 0)));
    const interactive = variant === 'interactive' && Boolean(onRate);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-driver-rating": "", "aria-busy": "true", "aria-label": "Loading driver rating", className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-10 w-10 shrink-0 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-1/2 animate-pulse rounded bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[70%] animate-pulse rounded bg-neutral-100" })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-driver-rating": "", "aria-label": !interactive ? `${driverName} rated ${filled} of ${total} stars` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: driverName, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-base font-bold text-on-surface", children: driverName }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted", children: subtitle }) : null, interactive ? ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": `Rate ${driverName}`, className: "mt-[var(--xen-space-xs)] flex gap-[var(--xen-space-xs)]", children: Array.from({ length: total }, (_, i) => {
                            const star = i + 1;
                            const on = star <= filled;
                            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-label": `${star} star${star > 1 ? 's' : ''}`, "aria-checked": on, onClick: () => onRate?.(star), className: (0, cn_1.cn)('text-xl leading-none transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', on ? 'text-accent' : 'text-muted'), children: on ? '★' : '☆' }, star));
                        }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xs)]", children: (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: filled, max: total, size: "md", showValue: true }) }))] })] }));
});
//# sourceMappingURL=DriverRatingRow.js.map