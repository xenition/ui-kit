"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRowV3 = ClaimRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/** Status → text-slot key (approved reads success, denied reads danger). */
const TONE_TEXT_SLOT = {
    neutral: 'muted',
    primary: 'primaryText',
    success: 'successText',
    warn: 'warnText',
    danger: 'dangerText',
    accent: 'accentText',
};
/**
 * ClaimRow, alternate design **V3** — a dense one-liner. A small status dot
 * (colored by the claim tone) sits ahead of the status glyph, then the title
 * and claim number share the line, and the amount + date close it on the right.
 * Status is still glyph + text + color (the glyph and label ride beside the
 * dot, never color-alone). Tight vertical rhythm for long lists. Same
 * `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
function ClaimRowV3({ claimNumber, title, status, amountCents, currency = 'USD', date, formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const colorRec = colors;
    const sd = (0, status_1.claimStatus)(status);
    const dotColor = sd.tone === 'neutral' ? colors.muted : colorRec[sd.tone] ?? colors.muted;
    const textColor = colorRec[TONE_TEXT_SLOT[sd.tone] ?? 'muted'] ?? colors.muted;
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: sd.label, style: {
                    width: 8,
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: dotColor,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: textColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [sd.glyph, " ", sd.label] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: claimNumber })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [amountCents != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: format(Math.max(0, Math.trunc(amountCents)), currency) })) : null, date != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: date })) : null] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Claim ${claimNumber}, ${title}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: row }));
}
//# sourceMappingURL=ClaimRowV3.js.map