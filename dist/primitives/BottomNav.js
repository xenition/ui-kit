"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomNav = BottomNav;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/**
 * Fixed bottom tab bar — the primary mobile navigation pattern. A full-width
 * row of tappable items on a `surface` background with a top hairline in the
 * `border` token; the active item renders in the `primary` tone while inactive
 * items use `muted`. Exposes `tablist`/`tab` roles with the selected state.
 * `position: fixed` to the viewport bottom. No literal colors.
 */
function BottomNav({ items, active, onChange, className }) {
    return ((0, jsx_runtime_1.jsx)("nav", { role: "tablist", className: (0, cn_1.cn)('fixed inset-x-0 bottom-0 z-40 flex w-full border-t border-border bg-surface', className), children: items.map((item) => {
            const selected = item.key === active;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "tab", "aria-selected": selected, "aria-label": item.label, onClick: () => onChange(item.key), className: (0, cn_1.cn)('flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', selected ? 'font-semibold text-primary' : 'text-muted'), children: [item.icon != null && (0, jsx_runtime_1.jsx)("span", { className: "inline-flex", children: item.icon }), (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: item.label })] }, item.key));
        }) }));
}
//# sourceMappingURL=BottomNav.js.map