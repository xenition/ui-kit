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
exports.RideRequestCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * RideRequestCard, redesigned (v3): a **compact dispatch row**. The rider + a
 * one-line pickup→dropoff route, the fare pinned right, and small Accept/Decline
 * controls — hairline-bordered for a queue. The opposite of v2's card. Same props,
 * token-only.
 */
exports.RideRequestCardV3 = React.forwardRef(function RideRequestCardV3({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant, onAccept, onDecline, loading = false, className, ...rest }, ref) {
    void variant;
    void riderRating;
    void scheduledFor;
    void surgeMultiplier;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-ride-request-card": "", "aria-label": "Loading request", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const meta = [distanceToPickup ? `${distanceToPickup} away` : null, tripDuration].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-request-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: riderAvatarUrl, name: riderName, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: riderName }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: [pickup.label, " ", (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\u2192" }), " ", dropoff.label, meta ? ` · ${meta}` : ''] })] }), typeof fareCents === 'number' ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: (0, commerce_1.formatMoney)(fareCents, currency) }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [onDecline ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: onDecline, children: "\u2715" }) : null, onAccept ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: onAccept, children: "Accept" }) : null] })] }));
});
//# sourceMappingURL=RideRequestCardV3.js.map