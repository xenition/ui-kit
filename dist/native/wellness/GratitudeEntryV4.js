"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GratitudeEntryV4 = GratitudeEntryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * GratitudeEntryV4 — the calm redesign of {@link GratitudeEntry}. Same props,
 * defaults, counter, remove control, empty note, and disabled-until-nonempty
 * submit. Only the visuals change: a clean surface card with recorded entries as
 * soft primary-tinted chips.
 */
function GratitudeEntryV4({ prompt = 'What are you grateful for?', value = '', placeholder = 'I’m grateful for…', entries = [], maxLength, onChangeText, onSubmit, onRemove, submitLabel = 'Add', emptyLabel = 'No entries yet — add your first.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const trimmed = value.trim();
    const canSubmit = trimmed.length > 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDE4F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: prompt })] }), entries.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: { gap: tokens.spacing.xs }, children: entries.map((item) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.sm,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                        borderRadius: tokens.radius.md,
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: colors.primary }, children: "\u2726" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: item.text }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "button", accessibilityLabel: `Remove: ${item.text}`, onPress: () => onRemove(item.id), style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u2715" })) : null] }, item.id))) })), (0, jsx_runtime_1.jsx)(primitives_1.Textarea, { rows: 3, value: value, maxLength: maxLength, onChangeText: onChangeText, placeholder: placeholder, accessibilityLabel: "Gratitude entry" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [maxLength != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [value.length, "/", maxLength] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: !canSubmit, onPress: () => canSubmit && onSubmit(trimmed), children: submitLabel })) : null] })] }));
}
//# sourceMappingURL=GratitudeEntryV4.js.map