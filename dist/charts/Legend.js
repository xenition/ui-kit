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
exports.Legend = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Chart legend — each entry is a color swatch (a theme color token, optionally
 * at reduced `opacity`, or the cycled series color) beside its `text-on-surface`
 * label. No literal colors. Guards an empty item list.
 */
exports.Legend = React.forwardRef(function Legend({ items, vertical = false, className, ...rest }, ref) {
    if (items.length === 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex gap-3', vertical ? 'flex-col flex-nowrap' : 'flex-row flex-wrap', className), ...rest, children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-block h-2.5 w-2.5 rounded-full", style: { backgroundColor: item.color ? (0, internal_1.colorVar)(item.color) : (0, internal_1.seriesColor)(i), opacity: item.opacity ?? 1 } }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface text-xs", children: item.label })] }, i))) }));
});
//# sourceMappingURL=Legend.js.map