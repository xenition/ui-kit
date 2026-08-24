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
exports.EnergyUsage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const BarChart_1 = require("../charts/BarChart");
/**
 * Energy-usage panel — a titled {@link Card} wrapping the shared inline-SVG
 * {@link BarChart} (no new chart code). The header shows the period total + unit;
 * the chart renders each sample as a `color`-token bar. When `data` is empty the
 * card shows a muted "No usage data yet" line instead of an axis. `labels` are
 * passed straight through (BarChart aligns them per bar). Token-bound throughout.
 */
exports.EnergyUsage = React.forwardRef(function EnergyUsage({ data, labels, title = 'Energy usage', total, unit, color = 'primary', height = 120, className, style }, ref) {
    const hasData = data.length > 0;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, style: style, className: className, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u26A1", color: color === 'accent' ? 'primary' : color, size: "base" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: title })] }), total != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-2xl font-bold text-on-surface", children: String(total) }), unit != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: unit }) : null] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)]", children: hasData ? ((0, jsx_runtime_1.jsx)(BarChart_1.BarChart, { data: data, labels: labels, height: height, color: color, "aria-label": `${title}, ${data.length} periods` })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No usage data yet" })) })] }));
});
//# sourceMappingURL=EnergyUsage.js.map