"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollButtonV4 = EnrollButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * EnrollButton — **V4** "campus" design (web parity of the native V4). The
 * course enrollment CTA built on the primitive `Button`, mapping the enrollment
 * lifecycle to appearance: `idle` → primary CTA, `enrolling` → disabled
 * "Enrolling…", `enrolled` → a soft-success confirmation pill with a ✓ (not
 * pressable), `full` → a disabled "Class full". State is announced and carried by
 * a word + glyph, never color alone. Identical props/behavior to
 * {@link EnrollButtonProps}. All colors from `--xen-*` token classes (no literals).
 */
function EnrollButtonV4({ state = 'idle', label = 'Enroll now', price, onEnroll, block = true, className, }) {
    const container = (0, cn_1.cn)('flex flex-col gap-1', block ? 'self-stretch' : 'self-start', className);
    if (state === 'enrolled') {
        return ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Enrolled", "data-xen-enroll-button": "", className: container, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-1 rounded-[var(--xen-radius-md)] bg-success/10 px-4 py-2.5 ring-1 ring-success/30", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base font-bold text-success", children: "\u2713" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-success", children: "Enrolled" })] }) }));
    }
    if (state === 'full') {
        return ((0, jsx_runtime_1.jsx)("div", { "data-xen-enroll-button": "", className: container, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", disabled: true, className: block ? 'w-full' : undefined, children: "Class full" }) }));
    }
    const enrolling = state === 'enrolling';
    return ((0, jsx_runtime_1.jsx)("div", { "data-xen-enroll-button": "", className: container, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: enrolling, onClick: onEnroll, "aria-label": enrolling ? 'Enrolling' : label, "aria-busy": enrolling || undefined, className: block ? 'w-full' : undefined, children: enrolling ? 'Enrolling…' : price ? `${label} · ${price}` : label }) }));
}
//# sourceMappingURL=EnrollButtonV4.js.map