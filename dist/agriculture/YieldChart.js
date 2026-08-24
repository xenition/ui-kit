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
exports.YieldChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
/** Chart color tokens that also map to an `Icon` color slot (all but `accent`). */
const ICON_COLOR = {
    primary: 'primary',
    accent: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
    muted: 'muted',
};
/**
 * A yield visualization — a titled {@link Card} that reuses the shared
 * {@link BarChart} (`variant='bars'`) or {@link LineChart} (`variant='line'`);
 * no new chart code. The header carries an optional `headline` + `unit`. An
 * empty `data` array renders a muted "No yield data yet" note instead of an
 * axis. Series color keys off a {@link ChartColor} token. Token-bound
 * throughout — no literal colors.
 */
exports.YieldChart = React.forwardRef(function YieldChart({ data, labels, title = 'Yield', headline, unit, variant = 'bars', color = 'success', height = 140, className, ...rest }, ref) {
    const series = Array.isArray(data) ? data : [];
    const hasData = series.length > 0;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-yield-chart": "", className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCC8", color: ICON_COLOR[color], size: "base" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: title })] }), headline != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-2xl font-bold text-on-surface", children: headline }), unit != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: unit }) : null] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: hasData ? (variant === 'line' ? ((0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: series, height: height, color: color, showDots: true, "aria-label": `${title}, ${series.length} periods` })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: series, labels: labels, height: height, color: color, "aria-label": `${title}, ${series.length} periods` }))) : ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No yield data yet" })) })] }));
});
//# sourceMappingURL=YieldChart.js.map