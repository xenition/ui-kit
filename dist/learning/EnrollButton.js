"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollButton = EnrollButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Course enrollment CTA built on the primitive `Button`. Maps the enrollment
 * lifecycle to button appearance: `idle` → primary CTA, `enrolling` → disabled
 * "Enrolling…", `enrolled` → a success confirmation (not pressable), `full` → a
 * disabled "Class full". Announces the current state. Token-only colors
 * (`--xen-*`).
 */
function EnrollButton({ state = 'idle', label = 'Enroll now', price, onEnroll, block = true, className, }) {
    const container = (0, cn_1.cn)('flex flex-col gap-1', block ? 'self-stretch' : 'self-start', className);
    if (state === 'enrolled') {
        return ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Enrolled", className: container, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-1 rounded-[var(--xen-radius-md)] bg-success px-4 py-2.5", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base font-bold text-on-success", children: "\u2713" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-success", children: "Enrolled" })] }) }));
    }
    if (state === 'full') {
        return ((0, jsx_runtime_1.jsx)("div", { className: container, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", disabled: true, className: block ? 'w-full' : undefined, children: "Class full" }) }));
    }
    const enrolling = state === 'enrolling';
    return ((0, jsx_runtime_1.jsx)("div", { className: container, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: enrolling, onClick: onEnroll, "aria-label": enrolling ? 'Enrolling' : label, "aria-busy": enrolling || undefined, className: block ? 'w-full' : undefined, children: enrolling ? 'Enrolling…' : price ? `${label} · ${price}` : label }) }));
}
//# sourceMappingURL=EnrollButton.js.map