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
exports.NeighborhoodStatV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
function inferTrend(delta) {
    if (typeof delta === 'number') {
        if (delta > 0)
            return 'up';
        if (delta < 0)
            return 'down';
    }
    return 'flat';
}
const TREND_CLASS = {
    up: 'text-success',
    down: 'text-danger',
    flat: 'text-muted',
};
const TREND_ARROW = {
    up: '▲',
    down: '▼',
    flat: '→',
};
/**
 * NeighborhoodStat — **V4** "listing" design (web parity of the native V4). The
 * editorial take on a single neighborhood metric: an optional glyph in a
 * soft-primary disc, a **big value numeral** with its label, and an
 * above/below-average trend indicator (arrow + delta, tinted `success` up /
 * `danger` down / `muted` flat). Same props/behavior as
 * {@link NeighborhoodStatProps} — the value/label/suffix/caption and the delta
 * tone/arrow logic are preserved. All colors from `--xen-*` token classes (no
 * literals).
 */
exports.NeighborhoodStatV4 = React.forwardRef(function NeighborhoodStatV4({ label, value, delta, trend, suffix, glyph, caption, className, ...rest }, ref) {
    const resolvedTrend = trend ?? inferTrend(delta);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-start gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md', className), ...rest, children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary", children: glyph })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-end gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-4xl font-bold leading-none text-on-surface", children: value }), suffix != null ? (0, jsx_runtime_1.jsx)("span", { className: "pb-0.5 text-base text-muted", children: suffix }) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('mt-1 flex items-center gap-1 text-sm font-semibold', TREND_CLASS[resolvedTrend]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs", children: TREND_ARROW[resolvedTrend] }), String(delta)] })) : null, caption ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-muted", children: caption }) : null] })] }));
});
//# sourceMappingURL=NeighborhoodStatV4.js.map