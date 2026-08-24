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
exports.RideRequestCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * RideRequestCard, redesigned (v2): a **bold dispatch card**. The rider + rating and
 * a fare hero head the card; a pickup→dropoff route with node dots and a connector
 * follows, with distance·duration·surge chips and big Accept/Decline actions.
 * Distinct from v1. Same props, token-only.
 */
exports.RideRequestCardV2 = React.forwardRef(function RideRequestCardV2({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant, onAccept, onDecline, loading = false, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-ride-request-card": "", "aria-label": "Loading request", className: (0, cn_1.cn)('h-48 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const chips = [distanceToPickup ? `${distanceToPickup} away` : null, tripDuration, scheduledFor].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-ride-request-card": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: riderAvatarUrl, name: riderName, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-on-surface", children: riderName }), typeof riderRating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: riderRating, size: "sm", showValue: true }) : null] }), typeof fareCents === 'number' ? (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(fareCents, currency) }) : null, typeof surgeMultiplier === 'number' ? (0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: "warn", children: [surgeMultiplier, "x"] }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-success", "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 truncate text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: pickup.label }), " \u00B7 ", pickup.address] })] }), (0, jsx_runtime_1.jsx)("span", { className: "ml-1 h-4 w-px bg-border", "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 rounded-sm bg-danger", "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 truncate text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: dropoff.label }), " \u00B7 ", dropoff.address] })] })] }), chips.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1.5", children: chips.map((c, i) => (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: c }, i)) })) : null, (onAccept || onDecline) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onDecline ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "outline", className: "flex-1", onClick: onDecline, children: "Decline" }) : null, onAccept ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: onAccept, children: "Accept" }) : null] })) : null] }));
});
//# sourceMappingURL=RideRequestCardV2.js.map