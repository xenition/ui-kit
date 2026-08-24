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
exports.TemperatureGraph = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const charts_1 = require("../charts");
/**
 * Temperature trend graph (web parity of the native `TemperatureGraph`) — a thin
 * wrapper over the shared web `LineChart` that adds a titled card, min/max
 * annotations, and optional x-axis labels. The line color is a semantic token
 * key (default `primary`); the chart itself is token-bound and handles the
 * empty/flat/single-point cases. Renders a muted empty state when `data` is
 * empty. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
exports.TemperatureGraph = React.forwardRef(function TemperatureGraph({ data, labels, unit = '°', title = 'Temperature', color = 'primary', height = 160, width = 300, emptyLabel = 'No temperature data', className, ...rest }, ref) {
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-muted", children: emptyLabel })] }));
    }
    const min = Math.min(...data);
    const max = Math.max(...data);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex flex-row items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["H ", max, unit, " \u00B7 L ", min, unit] })] }), (0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: data, color: color, height: height, width: width, showDots: true, "aria-label": `Temperature graph, high ${max}${unit}, low ${min}${unit}, ${data.length} points` }), labels && labels.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex flex-row justify-between", children: labels.map((label, index) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted'), children: label }, `${label}-${index}`))) })) : null] }));
});
//# sourceMappingURL=TemperatureGraph.js.map