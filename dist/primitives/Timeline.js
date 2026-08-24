"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = Timeline;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const DOT = {
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    neutral: 'bg-neutral-300',
};
/** Vertical activity timeline bound to the theme tokens. */
function Timeline({ items, className }) {
    return ((0, jsx_runtime_1.jsx)("ol", { className: (0, cn_1.cn)('flex flex-col', className), children: items.map((it, i) => {
            const last = i === items.length - 1;
            return ((0, jsx_runtime_1.jsxs)("li", { className: "flex gap-3 pb-6 last:pb-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', DOT[it.tone ?? 'primary']) }), !last && (0, jsx_runtime_1.jsx)("span", { className: "w-px flex-1 bg-border" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-on-surface", children: it.title }), it.description != null && (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted", children: it.description }), it.time != null && (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-muted", children: it.time })] })] }, i));
        }) }));
}
//# sourceMappingURL=Timeline.js.map