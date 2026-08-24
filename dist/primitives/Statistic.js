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
exports.Statistic = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
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
 * Web parity of the native `Statistic`: a compact inline metric — caption label,
 * a large value, and an optional up/down/flat delta. Renders bare (not a card) so
 * it can sit in rows, headers, or grids. All colors/sizes come from the `--xen-*`
 * tokens via Tailwind classes — no literal colors.
 */
exports.Statistic = React.forwardRef(function Statistic({ className, label, value, delta, trend, suffix, ...rest }, ref) {
    const resolvedTrend = trend ?? inferTrend(delta);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('inline-flex flex-col gap-0.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-end gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold leading-none text-on-surface", children: value }), suffix != null ? (0, jsx_runtime_1.jsx)("span", { className: "pb-0.5 text-base text-muted", children: suffix }) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex items-center gap-1 text-sm font-semibold', TREND_CLASS[resolvedTrend]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs", children: TREND_ARROW[resolvedTrend] }), String(delta)] })) : null] }));
});
//# sourceMappingURL=Statistic.js.map