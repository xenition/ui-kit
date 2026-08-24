"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLABadge = SLABadge;
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
    sm: { text: 'xs', padV: 1, padKey: 'xs' },
    md: { text: 'sm', padV: 3, padKey: 'sm' },
};
/**
 * SLA health pill for a helpdesk ticket. Encodes `on-track` / `at-risk` /
 * `breached` with a semantic tint **and** a distinct glyph + text label, so the
 * state is legible without relying on color (colorblind-safe / screen-reader
 * announced). Colors come only from `SemanticColors` (`success`/`warn`/`danger`)
 * via a token-derived soft tint — no literal hex. Purely presentational.
 */
function SLABadge({ state, hint, size = 'md', label, style, }) {
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
                backgroundColor: (0, internal_1.withAlpha)(accent, 0.14),
                borderColor: accent,
                borderWidth: 1,
                borderRadius: tokens.radius.full,
                paddingVertical: sz.padV,
                paddingHorizontal: tokens.spacing[sz.padKey],
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale[sz.text] }, children: spec.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale[sz.text], fontWeight: '600' }, children: text }), hint ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale[sz.text] }, children: hint })) : null] }));
}
//# sourceMappingURL=SLABadge.js.map