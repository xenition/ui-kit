"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRecordRow = HealthRecordRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TYPE_META = {
    lab: { glyph: '🧪', label: 'Lab', color: 'primary' },
    imaging: { glyph: '🩻', label: 'Imaging', color: 'accent' },
    note: { glyph: '📝', label: 'Note', color: 'muted' },
    immunization: { glyph: '💉', label: 'Immunization', color: 'success' },
    prescription: { glyph: '💊', label: 'Prescription', color: 'warn' },
    document: { glyph: '📄', label: 'Document', color: 'muted' },
};
/**
 * A health-record list row for a patient timeline / documents screen: a
 * type-coded icon, the record title, a provider · date meta line, a type tag,
 * and an optional unread dot. Tap to open. The type is labelled in text as well
 * as color-coded. Informational UI only — not a medical device. Token-only
 * colors.
 */
function HealthRecordRow({ type, title, date, provider, unread = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = TYPE_META[type];
    const metaLine = [provider, date].filter(Boolean);
    const a11y = `${meta.label}: ${title}${metaLine.length ? `, ${metaLine.join(', ')}` : ''}${unread ? ', unread' : ''}`;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 56,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: unread ? '700' : '600' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.color], fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label }), metaLine.length ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", metaLine.join('  ·  ')] })) : null] })] }), unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u203A" }))] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=HealthRecordRow.js.map