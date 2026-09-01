"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRecordRowV4 = HealthRecordRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const TYPE_META = {
    lab: { glyph: '🧪', label: 'Lab', color: 'primary' },
    imaging: { glyph: '🩻', label: 'Imaging', color: 'accent' },
    note: { glyph: '📝', label: 'Note', color: 'muted' },
    immunization: { glyph: '💉', label: 'Immunization', color: 'success' },
    prescription: { glyph: '💊', label: 'Prescription', color: 'warn' },
    document: { glyph: '📄', label: 'Document', color: 'muted' },
};
/**
 * HealthRecordRow — **V4** "clinic" design. The calm, clinical take on a
 * patient-timeline row: an elevated rounded surface with a soft shadow, the type
 * glyph tucked in a soft-primary well, the record title, a provider · date meta
 * line, a labelled type chip (text label + token tone, never color alone), and an
 * optional unread dot. Tap to open, with a ≥44px tap target. Identical
 * props/behavior to {@link HealthRecordRowProps}. Token-only colors via
 * `useXenitionTheme()`. Informational UI only — not a medical device.
 */
function HealthRecordRowV4({ type, title, date, provider, unread = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = TYPE_META[type] ?? TYPE_META.document;
    const accent = colors[meta.color];
    const metaLine = [provider, date].filter(Boolean);
    const a11y = `${meta.label}: ${title}${metaLine.length ? `, ${metaLine.join(', ')}` : ''}${unread ? ', unread' : ''}`;
    const shellStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        minHeight: 56,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [shellStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: unread ? '700' : '600' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    paddingHorizontal: tokens.spacing.sm,
                                    paddingVertical: tokens.spacing.xs,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label }) }), metaLine.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaLine.join('  ·  ') })) : null] })] }), unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u203A" }))] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=HealthRecordRowV4.js.map