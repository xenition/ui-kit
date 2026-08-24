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
exports.ETABar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const ETA_META = {
    'on-time': { glyph: '⏱', label: 'On time', tone: 'success' },
    ahead: { glyph: '⚡', label: 'Ahead', tone: 'primary' },
    delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
    arrived: { glyph: '✓', label: 'Arrived', tone: 'success' },
};
/**
 * A horizontal journey/ETA progress bar for a shipment or vehicle: a token fill
 * sized to `progress`, with an origin→destination label row and a glyph + word
 * punctuality status. Exposes a `progressbar` role with `aria-valuenow` so the
 * completion is announced, not inferred from the fill color. No literal colors —
 * the fill and track come from theme tokens. Web parity of the native `ETABar`.
 */
exports.ETABar = React.forwardRef(function ETABar({ progress, status = 'on-time', eta, origin, destination, loading = false, className, ...rest }, ref) {
    const pct = (0, internal_1.clampPct)(progress);
    const meta = ETA_META[status];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuemin": loading ? undefined : 0, "aria-valuemax": loading ? undefined : 100, "aria-valuenow": loading ? undefined : pct, "aria-busy": loading ? true : undefined, "aria-label": loading ? 'ETA loading' : `${meta.label}${eta ? `, ETA ${eta}` : ''}, ${pct}% complete`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', internal_1.TONE_TEXT[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', internal_1.TONE_TEXT[meta.tone]), children: meta.label })] }), eta ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-on-surface", children: eta }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 overflow-hidden rounded-full bg-neutral-100", children: !loading ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', internal_1.TONE_BG[meta.tone]), style: { width: `${pct}%` } })) : ((0, jsx_runtime_1.jsx)("div", { className: "h-full w-[40%] animate-pulse rounded-full bg-neutral-200" })) }), origin || destination ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted", children: origin ?? '' }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-right text-xs text-muted", children: destination ?? '' })] })) : null] }));
});
//# sourceMappingURL=ETABar.js.map