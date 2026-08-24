"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceRow = RecurrenceRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const format_1 = require("./format");
const DEFAULT_OPTIONS = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
];
/**
 * The recurrence editor row for an event form. `inline` renders preset chips
 * (selection announced via `accessibilityState.selected`, not color-alone);
 * `summary` collapses to a single tappable row that shows the current rule and
 * defers to a host-owned picker. Token colors only.
 */
function RecurrenceRow({ value, onChange, label = 'Repeat', variant = 'inline', onPress, options = DEFAULT_OPTIONS, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const current = options.find((o) => o.value === value) ?? options[0];
    if (variant === 'summary') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}: ${current?.label ?? 'None'}`, onPress: onPress, style: ({ pressed }) => [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: tokens.spacing.sm,
                    opacity: pressed ? 0.7 : 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD01", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginLeft: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: current?.label ?? 'None' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginLeft: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u203A" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD01", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginLeft: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: options.map((o) => {
                    const active = o.value === value;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: o.label, accessibilityState: { selected: active }, onPress: () => onChange?.(o.value), style: {
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: active ? colors.primary : colors.border,
                            backgroundColor: active ? (0, format_1.withAlpha)(colors.primary, 0.14) : colors.surface,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? colors.primary : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: active ? '700' : '500' }, children: o.label }) }, o.value));
                }) })] }));
}
//# sourceMappingURL=RecurrenceRow.js.map