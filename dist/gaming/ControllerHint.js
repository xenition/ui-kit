"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerHint = ControllerHint;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const CAP = {
    sm: { box: 'h-5 min-w-[20px] text-xs', text: 'text-xs', label: 'text-xs' },
    md: { box: 'h-[26px] min-w-[26px] text-sm', text: 'text-sm', label: 'text-sm' },
};
/**
 * A controller / keybind hint — a rounded "key cap" showing the button glyph
 * next to its action label (e.g. `Ⓐ Jump`). Pass a single `button`/`action` or
 * a `hints` array for a HUD strip. The action text always accompanies the glyph,
 * so the mapping never relies on the symbol alone. Token-only.
 */
function ControllerHint({ button, action, hints, variant = 'pill', size = 'md', className, }) {
    const sz = CAP[size];
    const list = hints && hints.length > 0
        ? hints
        : button != null
            ? [{ button, action: action ?? '' }]
            : [];
    if (list.length === 0)
        return null;
    const renderHint = (hint, key) => ((0, jsx_runtime_1.jsxs)("span", { role: "img", "aria-label": hint.action ? `${hint.action}: ${hint.button}` : hint.button, className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)]', variant === 'pill' &&
            'rounded-full border border-border bg-surface px-[var(--xen-space-sm)] py-[3px]'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-sm)] bg-primary px-1 font-bold text-on-primary', sz.box), children: hint.button }), hint.action ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-on-surface', sz.label), children: hint.action })) : null] }, key));
    if (list.length === 1) {
        return (0, jsx_runtime_1.jsx)("div", { className: className, children: renderHint(list[0], 'h0') });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-wrap gap-[var(--xen-space-sm)]', className), children: list.map((h, i) => renderHint(h, `h${i}`)) }));
}
//# sourceMappingURL=ControllerHint.js.map