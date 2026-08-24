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
exports.TrendCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Sparkline_1 = require("./Sparkline");
/**
 * A labelled stat paired with an inline {@link Sparkline}. Token-bound surface:
 * `bg-surface` / `border-border` container, `text-muted` label, `text-on-surface`
 * value, and the delta tinted by the chosen color token. No literal colors.
 */
exports.TrendCard = React.forwardRef(function TrendCard({ label, value, delta, data, color = 'primary', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('bg-surface text-on-surface border border-border shadow-sm', 'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)] flex flex-col gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted text-sm", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-on-surface text-2xl font-bold", children: value }), delta ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", style: { color: `var(--xen-${color})` }, children: delta })) : null] }), data && data.length > 0 ? (0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: data, color: color, height: 28, width: 120 }) : null] }));
});
//# sourceMappingURL=TrendCard.js.map