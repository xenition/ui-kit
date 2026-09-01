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
exports.ComparisonTableV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CheckCell = () => ((0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "mx-auto text-success", children: (0, jsx_runtime_1.jsx)("path", { d: "M3 8.5l3.5 3.5L13 4.5" }) }));
const CrossCell = () => ((0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", className: "mx-auto text-muted", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 4l8 8M12 4l-8 8" }) }));
const renderValue = (value) => {
    if (value === true)
        return (0, jsx_runtime_1.jsx)(CheckCell, {});
    if (value === false)
        return (0, jsx_runtime_1.jsx)(CrossCell, {});
    return (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: value });
};
/**
 * ComparisonTable — **V4** "showcase" design (web parity of the native V4). A
 * clean bordered feature-comparison grid: plan `columns` across the top ×
 * feature `rows` down the side. ✓ = success glyph, ✗ = muted glyph (never color
 * alone), text cells pass through, and the highlighted/recommended column gets a
 * soft-primary tint plus a soft-primary chip. Same props/behavior as
 * {@link ComparisonTableProps}; token-only colors, no literals.
 */
exports.ComparisonTableV4 = React.forwardRef(function ComparisonTableV4({ columns, rows, featureLabel = '', highlightLabel = 'Recommended', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { ref: ref, "data-xen-comparison": "", className: (0, cn_1.cn)('w-full border-collapse text-left', 'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-border bg-neutral-50", children: [(0, jsx_runtime_1.jsx)("th", { scope: "col", className: "p-[var(--xen-space-md)] text-sm font-extrabold tracking-tight text-on-surface", children: featureLabel }), columns.map((column, i) => ((0, jsx_runtime_1.jsx)("th", { scope: "col", "data-highlight": column.highlight ? 'true' : 'false', className: (0, cn_1.cn)('p-[var(--xen-space-md)] text-center text-sm font-extrabold tracking-tight', column.highlight ? 'bg-primary-50 text-primary' : 'text-on-surface'), children: (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col items-center gap-[var(--xen-space-xs)]", children: [column.name, column.highlight ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-[var(--xen-radius-full)] bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700", children: highlightLabel })) : null] }) }, i)))] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-border", children: rows.map((row, r) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { scope: "row", className: "p-[var(--xen-space-md)] text-sm font-medium text-on-surface", children: row.label }), columns.map((column, c) => ((0, jsx_runtime_1.jsx)("td", { "data-highlight": column.highlight ? 'true' : 'false', className: (0, cn_1.cn)('p-[var(--xen-space-md)] text-center align-middle', column.highlight && 'bg-primary-50'), children: renderValue(row.values[c] ?? false) }, c)))] }, r))) })] }) }));
});
//# sourceMappingURL=ComparisonTableV4.js.map