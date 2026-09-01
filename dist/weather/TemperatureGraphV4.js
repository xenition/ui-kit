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
exports.TemperatureGraphV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const charts_1 = require("../charts");
/**
 * TemperatureGraph — **on a brand ground** design (v4), web parity of the native
 * `TemperatureGraphV4`. The shared web `LineChart` over a full `primary`-colored
 * panel, with the title and min/max annotation in `on-primary` and x-axis labels
 * in `primary-100` — the weather-app "chance of rain" look. The curve defaults to
 * the `accent` token so it reads on the brand ground (overridable via `color`);
 * all colors come from `--xen-*` classes / vars, no literals. Renders a muted
 * note when `data` is empty. Same props as {@link TemperatureGraphProps}.
 */
exports.TemperatureGraphV4 = React.forwardRef(function TemperatureGraphV4({ data, labels, unit = '°', title = 'Temperature', color = 'accent', height = 160, width = 300, emptyLabel = 'No temperature data', className, ...rest }, ref) {
    const ground = 'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-5';
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(ground, className), ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-primary", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-primary-100", children: emptyLabel })] }));
    }
    const min = Math.min(...data);
    const max = Math.max(...data);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(ground, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex flex-row items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-primary", children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-primary-100", children: ["H ", max, unit, " \u00B7 L ", min, unit] })] }), (0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: data, color: color, height: height, width: width, showDots: true, "aria-label": `Temperature graph, high ${max}${unit}, low ${min}${unit}, ${data.length} points` }), labels && labels.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex flex-row justify-between", children: labels.map((label, index) => ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: label }, `${label}-${index}`))) })) : null] }));
});
//# sourceMappingURL=TemperatureGraphV4.js.map