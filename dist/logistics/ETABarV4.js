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
exports.ETABarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
const ETA_META = {
    'on-time': { glyph: '⏱', label: 'On time', tone: 'success' },
    ahead: { glyph: '⚡', label: 'Ahead', tone: 'primary' },
    delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
    arrived: { glyph: '✓', label: 'Arrived', tone: 'success' },
};
/**
 * ETABar — **V4** "dispatch" design (web parity of the native V4). The confident,
 * operations-desk take on a journey/ETA bar: an elevated rounded card with a soft
 * shadow, a labelled glyph + word punctuality badge (never color alone), a big
 * legible **tabular-nums** ETA, a token fill sized to `progress`, and an
 * origin→destination label row. Exposes a `progressbar` role with `aria-valuenow`
 * so completion is announced, not inferred from the fill color. Identical
 * props/behavior to {@link ETABarProps}. The fill and track come from theme
 * tokens — no literals.
 */
exports.ETABarV4 = React.forwardRef(function ETABarV4({ progress, status = 'on-time', eta, origin, destination, loading = false, className, ...rest }, ref) {
    const pct = (0, internal_1.clampPct)(progress);
    const meta = ETA_META[status];
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuemin": loading ? undefined : 0, "aria-valuemax": loading ? undefined : 100, "aria-valuenow": loading ? undefined : pct, "aria-busy": loading ? true : undefined, "aria-label": loading ? 'ETA loading' : `${meta.label}${eta ? `, ETA ${eta}` : ''}, ${pct}% complete`, "data-xen-eta-bar": "", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] }), eta ? (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold tabular-nums text-on-surface", children: eta }) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 overflow-hidden rounded-full bg-neutral-100", children: !loading ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', internal_1.TONE_BG[meta.tone]), style: { width: `${pct}%` } })) : ((0, jsx_runtime_1.jsx)("div", { className: "h-full w-[40%] animate-pulse rounded-full bg-neutral-200" })) }), origin || destination ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted", children: origin ?? '' }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-right text-xs text-muted", children: destination ?? '' })] })) : null] }));
});
//# sourceMappingURL=ETABarV4.js.map