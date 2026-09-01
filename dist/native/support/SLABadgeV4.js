"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLABadgeV4 = SLABadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
// breached → danger, at-risk → warn, on-track → success. Each also carries a
// distinct glyph so the state reads without color (a11y / colorblind).
const STATE = {
    'on-track': { slot: 'success', glyph: '●', label: 'On track' },
    'at-risk': { slot: 'warn', glyph: '▲', label: 'At risk' },
    breached: { slot: 'danger', glyph: '■', label: 'Breached' },
};
const SIZE = {
    sm: { text: 'xs', hint: 'sm', padV: 2, padKey: 'xs' },
    md: { text: 'sm', hint: 'base', padV: 4, padKey: 'sm' },
};
/**
 * SLABadge — **V4** "calm console" design (native twin, drop-in for
 * {@link SLABadgeProps}). An SLA status badge rendered as a soft-tint pill
 * (`withAlpha(color, 0.12)`) carrying a glyph + state label and, when supplied, a
 * big legible remaining-time `hint` in `tabular-nums`. Encodes `on-track` →
 * success, `at-risk` → warn, `breached` → danger with a distinct glyph **and**
 * color, so the state reads without relying on color (colorblind-safe /
 * screen-reader announced). Same props/behavior as the base; token-only colors
 * via `useXenitionTheme()` — no literal hex. Presentational.
 */
function SLABadgeV4({ state, hint, size = 'md', label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const spec = STATE[state] ?? STATE['on-track'];
    const sz = SIZE[size] ?? SIZE.md;
    const accent = colors[spec.slot];
    const text = label ?? spec.label;
    const a11y = hint ? `SLA ${text}, ${hint}` : `SLA ${text}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: (0, internal_1.withAlpha)(accent, 0.12),
                borderRadius: tokens.radius.full,
                paddingVertical: sz.padV,
                paddingHorizontal: tokens.spacing[sz.padKey],
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale[sz.text] }, children: spec.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale[sz.text], fontWeight: '600' }, children: text }), hint ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: accent,
                    fontSize: tokens.typography.scale[sz.hint],
                    fontWeight: '700',
                    fontVariant: ['tabular-nums'],
                }, children: hint })) : null] }));
}
//# sourceMappingURL=SLABadgeV4.js.map