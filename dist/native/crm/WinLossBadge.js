"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinLossBadge = WinLossBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * Outcome badge for a deal — `won` / `lost` / `open` / `pending`. The result is
 * carried by a glyph **and** a word (never color alone): won `✓`, lost `✕`,
 * open `◔`, pending `⋯`. Won maps to the `success` token, lost to `danger`. Use
 * the `badge` variant on cards and the `inline` variant inside dense rows. All
 * colors come from the theme via the tone map — no literals.
 */
function WinLossBadge({ outcome, variant = 'badge', size = 'md', hideLabel = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.OUTCOME_META[outcome];
    const label = `${meta.label} deal`;
    if (variant === 'inline') {
        const color = (0, internal_1.toneColor)(colors, meta.tone);
        const fontSize = tokens.typography.scale[size === 'sm' ? 'xs' : 'sm'];
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: label, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize, color }, children: meta.glyph }), hideLabel ? null : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize, color, fontWeight: '600' }, children: meta.label }))] }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: label, style: [{ alignSelf: 'flex-start' }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: size, children: hideLabel ? meta.glyph : `${meta.glyph} ${meta.label}` }) }));
}
//# sourceMappingURL=WinLossBadge.js.map