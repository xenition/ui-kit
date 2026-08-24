"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Descriptions = Descriptions;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/** Key/value detail grid bound to the theme tokens — for record/detail views. */
function Descriptions({ items, columns = 1, className }) {
    return ((0, jsx_runtime_1.jsx)("dl", { className: (0, cn_1.cn)('grid gap-x-6 gap-y-3', columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1', className), children: items.map((it, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs font-medium uppercase tracking-wide text-muted", children: it.label }), (0, jsx_runtime_1.jsx)("dd", { className: "text-sm text-on-surface", children: it.value })] }, i))) }));
}
//# sourceMappingURL=Descriptions.js.map