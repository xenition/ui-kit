"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = RadioGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/** Single-choice radio group bound to the theme tokens. */
function RadioGroup({ options, value, onChange, name, orientation = 'vertical', className, }) {
    return ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", className: (0, cn_1.cn)('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap', className), children: options.map((o) => ((0, jsx_runtime_1.jsxs)("label", { className: (0, cn_1.cn)('inline-flex items-center gap-2 text-sm text-on-surface', o.disabled && 'opacity-50'), children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: name, value: o.value, checked: o.value === value, disabled: o.disabled, onChange: () => onChange(o.value), className: "h-4 w-4 border-border accent-primary" }), o.label] }, o.value))) }));
}
//# sourceMappingURL=RadioGroup.js.map