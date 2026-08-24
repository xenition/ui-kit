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
exports.DriverCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A driver identity block — avatar, name, star rating, trip count, the assigned
 * vehicle and plate, an online/offline state, and an optional ETA. Availability
 * is conveyed by a text-labelled badge (not color alone). Data +
 * `onMessage`/`onCall`/`onClick` callbacks only; nothing fetches. Colors come
 * from `--xen-*` token classes — no literal colors. When `onClick` is set the
 * card becomes a keyboard-operable `role="button"`; the nested actions are real
 * buttons that stop propagation. `variant="assigned"` highlights the ETA;
 * `variant="compact"` tightens it. Web parity of the native `DriverCard`.
 */
exports.DriverCard = React.forwardRef(function DriverCard({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, variant = 'default', onMessage, onCall, onClick, loading = false, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const assigned = variant === 'assigned';
    const pad = compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-driver-card": "", "aria-busy": "true", "aria-label": "Loading driver", className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface', pad, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-11 w-11 shrink-0 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 animate-pulse rounded bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[70%] animate-pulse rounded bg-neutral-100" })] })] }));
    }
    const statusWord = online === undefined ? undefined : online ? 'Online' : 'Offline';
    const a11y = `Driver ${name}${typeof rating === 'number' ? `, rated ${rating} stars` : ''}${vehicle ? `, ${vehicle}` : ''}${etaLabel ? `, ETA ${etaLabel}` : ''}${statusWord ? `, ${statusWord}` : ''}`;
    const interactive = Boolean(onClick);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: compact ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-base font-bold text-on-surface", children: name }), statusWord ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: online ? 'success' : 'neutral', children: statusWord }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }) : null, typeof tripCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [tripCount.toLocaleString(), " trips"] })) : null] })] }), assigned && etaLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-primary", children: etaLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "ETA" })] })) : null] }), vehicle || plate ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [vehicle ? ((0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 shrink truncate text-sm text-muted", children: ["\uD83D\uDE97 ", vehicle] })) : null, plate ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-[var(--xen-radius-sm)] border border-border bg-neutral-100 px-[var(--xen-space-xs)] py-0.5 text-xs font-bold tracking-widest text-on-surface", children: plate })) : null, !assigned && etaLabel ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-primary", children: ["\u00B7 ETA ", etaLabel] })) : null] })) : null, onMessage || onCall ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onMessage ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onMessage();
                        }, "aria-label": `Message ${name}`, className: "flex-1", children: "Message" })) : null, onCall ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onCall();
                        }, "aria-label": `Call ${name}`, className: "flex-1", children: "Call" })) : null] })) : null] }));
    const rootClass = (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface', compact && 'gap-[var(--xen-space-sm)]', pad, interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className);
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-driver-card": "", "aria-label": a11y, className: rootClass, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-driver-card": "", role: "button", tabIndex: 0, "aria-label": a11y, onClick: onClick, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
            }
        }, className: rootClass, ...rest, children: body }));
});
//# sourceMappingURL=DriverCard.js.map