"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segmented = Segmented;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/** Segmented control (pill toggle group) bound to the theme tokens. */
function Segmented({ options, value, onChange, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { role: "tablist", className: (0, cn_1.cn)('inline-flex rounded-[var(--xen-radius-md)] bg-neutral-100 p-1', className), children: options.map((o) => {
            const active = o.value === value;
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "tab", "aria-selected": active, onClick: () => onChange(o.value), className: (0, cn_1.cn)('rounded-[var(--xen-radius-sm)] px-3 py-1 text-sm font-medium transition-colors', active ? 'bg-surface text-on-surface shadow-sm' : 'text-muted hover:text-on-surface'), children: o.label }, o.value));
        }) }));
}
//# sourceMappingURL=Segmented.js.map