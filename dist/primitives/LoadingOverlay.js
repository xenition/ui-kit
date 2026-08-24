"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingOverlay = LoadingOverlay;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const Spinner_1 = require("./Spinner");
/**
 * Blocking loading overlay — an absolute-fill dim layer with a centered spinner
 * (from the `primary` token) and an optional label card. The dim is a faded
 * neutral scrim; the label card is `surface`. Fills its nearest positioned
 * ancestor, so wrap it in a `relative` parent (or let it cover the screen).
 * Announces a polite busy live region. No literal colors.
 */
function LoadingOverlay({ visible, label, className, }) {
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-label": label ?? 'Loading', "aria-busy": "true", "aria-live": "polite", className: (0, cn_1.cn)('absolute inset-0 z-40 flex items-center justify-center bg-neutral-950/40', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface px-8 py-6", children: [(0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "lg" }), label && (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: label })] }) }));
}
//# sourceMappingURL=LoadingOverlay.js.map