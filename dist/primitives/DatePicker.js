"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = DatePicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/** Native, zero-asset date input bound to the theme tokens. */
function DatePicker({ value, onChange, min, max, disabled, invalid, className, }) {
    return ((0, jsx_runtime_1.jsx)("input", { type: "date", value: value, min: min, max: max, disabled: disabled, onChange: (e) => onChange(e.target.value), "aria-invalid": invalid || undefined, className: (0, cn_1.cn)('rounded-[var(--xen-radius-sm)] border bg-surface px-3 py-2 text-base text-on-surface', 'focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50', invalid
            ? 'border-danger focus:border-danger focus:ring-danger'
            : 'border-border focus:border-primary focus:ring-primary', className) }));
}
//# sourceMappingURL=DatePicker.js.map