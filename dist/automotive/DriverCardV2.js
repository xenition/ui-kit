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
exports.DriverCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * DriverCard, redesigned (v2): an **elevated driver card**. A large avatar (with an
 * online dot) heads the name, rating·trips, vehicle and a plate chip, with the ETA
 * prominent and Message/Call actions anchoring the card. Distinct from v1. Same
 * props, token-only.
 */
exports.DriverCardV2 = React.forwardRef(function DriverCardV2({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online = false, variant, onMessage, onCall, onClick, loading = false, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-driver-card": "", "aria-label": "Loading driver", className: (0, cn_1.cn)('h-32 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-driver-card": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": interactive ? `${name} profile` : name, onClick: interactive ? () => onClick?.() : undefined, disabled: !interactive, className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "lg" }), online ? (0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success", "aria-label": "Online" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }) : null, typeof tripCount === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u00B7 ", tripCount, " trips"] }) : null] }), vehicle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: vehicle }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [etaLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-primary", children: etaLabel }) : null, plate ? (0, jsx_runtime_1.jsx)("span", { className: "rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-xs text-on-surface", children: plate }) : null] })] }), (onMessage || onCall) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onMessage ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "outline", className: "flex-1", onClick: onMessage, children: "Message" }) : null, onCall ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: onCall, children: "Call" }) : null] })) : null] }));
});
//# sourceMappingURL=DriverCardV2.js.map