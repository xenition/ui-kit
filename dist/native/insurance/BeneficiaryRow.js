"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryRow = BeneficiaryRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const KIND_LABEL = {
    primary: 'Primary',
    contingent: 'Contingent',
};
/**
 * One beneficiary in a policy's allocation list: avatar (initials fallback),
 * name + relationship, a primary/contingent tag, and a right-aligned
 * allocation percentage. The percentage is clamped to 0–100 and rendered whole
 * (no float drift). Token-bound throughout; becomes a button only when
 * `onPress` is supplied.
 */
function BeneficiaryRow({ name, relationship, allocationPct, kind = 'primary', avatarUrl, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const pct = Number.isFinite(allocationPct) ? Math.min(100, Math.max(0, allocationPct)) : 0;
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: avatarUrl, name: name, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [KIND_LABEL[kind], relationship != null ? ` · ${relationship}` : ''] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${(0, format_1.formatPct)(pct)} allocation`, style: { color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, format_1.formatPct)(pct) })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${KIND_LABEL[kind]} beneficiary, ${(0, format_1.formatPct)(pct)}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=BeneficiaryRow.js.map