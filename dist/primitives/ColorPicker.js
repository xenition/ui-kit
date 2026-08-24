"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = ColorPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/**
 * Swatch-grid color picker — a grid of tappable color chips. With no `swatches`
 * prop it builds its palette straight from the semantic theme tokens (primary,
 * accent, success, warn, danger, plus neutrals) via `bg-*` classes, so the
 * rendered colors are always token-pure — no literal colors (kit lint rule).
 * The selected chip gets a `primary` selection ring.
 */
const DEFAULT_PALETTE = [
    { label: 'Primary', value: 'primary', className: 'bg-primary' },
    { label: 'Accent', value: 'accent', className: 'bg-accent' },
    { label: 'Success', value: 'success', className: 'bg-success' },
    { label: 'Warning', value: 'warn', className: 'bg-warn' },
    { label: 'Danger', value: 'danger', className: 'bg-danger' },
    { label: 'Foreground', value: 'on-surface', className: 'bg-on-surface' },
    { label: 'Muted', value: 'muted', className: 'bg-muted' },
    { label: 'Border', value: 'border', className: 'bg-border' },
    { label: 'Neutral 300', value: 'neutral-300', className: 'bg-neutral-300' },
    { label: 'Neutral 500', value: 'neutral-500', className: 'bg-neutral-500' },
    { label: 'Neutral 700', value: 'neutral-700', className: 'bg-neutral-700' },
];
function ColorPicker({ value, onChange, swatches, disabled = false, accessibilityLabel = 'Choose a color', className, }) {
    const palette = swatches ?? DEFAULT_PALETTE;
    return ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": accessibilityLabel, className: (0, cn_1.cn)('flex flex-wrap gap-sm', disabled && 'pointer-events-none opacity-50', className), children: palette.map((sw) => {
            const active = value === sw.value;
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-label": sw.label, "aria-checked": active, disabled: disabled, onClick: () => onChange?.(sw.value), className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-full)] border transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', active ? 'border-2 border-primary' : 'border-border'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-5 w-5 rounded-[var(--xen-radius-full)]', sw.className), style: sw.className ? undefined : { backgroundColor: sw.value } }) }, `${sw.label}-${sw.value}`));
        }) }));
}
//# sourceMappingURL=ColorPicker.js.map