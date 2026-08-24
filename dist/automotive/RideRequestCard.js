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
exports.RideRequestCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * An inbound ride request for a driver to accept or decline — rider identity and
 * rating, the pickup→drop-off route, an optional fare estimate, plus trip
 * distance/duration and an optional surge badge. Data + `onAccept`/`onDecline`
 * only; nothing fetches. Endpoints are marked with text-labelled glyphs (not
 * color alone) and the surge state is spelled out. Colors come from `--xen-*`
 * token classes — no literal colors. `variant="scheduled"` swaps the header for
 * a scheduled-time line; `variant="compact"` tightens spacing. Web parity of the
 * native `RideRequestCard`.
 */
exports.RideRequestCard = React.forwardRef(function RideRequestCard({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant = 'incoming', onAccept, onDecline, loading = false, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const scheduled = variant === 'scheduled';
    const pad = compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-request": "", "aria-busy": "true", "aria-label": "Loading ride request", className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface', pad, 'flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-[55%] animate-pulse rounded bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-[80%] animate-pulse rounded bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-[70%] animate-pulse rounded bg-neutral-100" })] }));
    }
    const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const stopRow = (glyph, tone, stop) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold', tone), children: glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block text-xs font-semibold text-muted", children: stop.label }), (0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm text-on-surface", children: stop.address })] })] }));
    const a11y = `Ride request from ${riderName}, pickup ${pickup.address}, drop off ${dropoff.address}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-request": "", "aria-label": a11y, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface', pad, 'flex flex-col', compact ? 'gap-[var(--xen-space-sm)]' : 'gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: riderAvatarUrl, name: riderName, size: compact ? 'sm' : 'md' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-base font-bold text-on-surface", children: riderName }), typeof riderRating === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: riderRating, size: "sm", showValue: true })) : null] }), hasSurge ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "warn", children: `${surgeMultiplier}x surge` }) : null] }), scheduled && scheduledFor ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)] bg-primary-50 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDDD3\uFE0F" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-on-surface", children: ["Scheduled for ", scheduledFor] })] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [stopRow('A', 'text-primary', pickup), (0, jsx_runtime_1.jsx)("span", { className: "ml-[10px] block h-[var(--xen-space-sm)] w-px bg-border", "aria-hidden": "true" }), stopRow('B', 'text-success', dropoff)] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-md)]", children: [typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-fare": "", className: "text-lg font-bold text-on-surface", children: (0, commerce_1.formatMoney)(fareCents, currency) })) : null, distanceToPickup ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\uD83D\uDCCD ", distanceToPickup, " away"] })) : null, tripDuration ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u23F1 ", tripDuration, " trip"] }) : null] }), onAccept || onDecline ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onDecline ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "danger", onClick: onDecline, "aria-label": `Decline ride from ${riderName}`, className: "flex-1", children: "Decline" })) : null, onAccept ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: onAccept, "aria-label": `Accept ride from ${riderName}`, className: "flex-[2]", children: "Accept" })) : null] })) : null] }));
});
//# sourceMappingURL=RideRequestCard.js.map