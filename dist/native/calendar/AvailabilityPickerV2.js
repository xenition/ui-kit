"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityPickerV2 = AvailabilityPickerV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
function isSelected(value, start) {
    if (value == null)
        return false;
    const list = Array.isArray(value) ? value : [value];
    return list.some((d) => d.getTime() === start.getTime());
}
const PERIODS = ['Morning', 'Afternoon', 'Evening'];
function periodOf(date) {
    const h = date.getHours();
    if (h < 12)
        return 'Morning';
    if (h < 17)
        return 'Afternoon';
    return 'Evening';
}
/**
 * AvailabilityPicker, redesigned (v2): **slot chips grouped by part of day**.
 * Open times wrap into rounded chips under Morning / Afternoon / Evening
 * headings; a selected chip fills (and is announced), blocked chips render
 * struck-through and inert. Empty + loading states included. Same props,
 * token-pure.
 */
function AvailabilityPickerV2({ slots = [], value = null, multiple = false, onSelect, loading = false, emptyLabel = 'No times available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: "Loading times", style: style, children: [0, 1].map((g) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginBottom: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: tokens.spacing['2xl'], borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100], marginBottom: tokens.spacing.sm } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.xl, width: tokens.spacing['2xl'] + tokens.spacing.lg, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] } }, i))) })] }, g))) }));
    }
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: emptyLabel, style: [{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: emptyLabel }) }));
    }
    const groups = PERIODS.map((period) => ({
        period,
        items: slots.filter((s) => periodOf(s.start) === period),
    })).filter((g) => g.items.length > 0);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: style, children: groups.map((group) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginBottom: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                        marginBottom: tokens.spacing.sm,
                    }, children: group.period }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: group.items.map((slot, i) => {
                        const selected = isSelected(value, slot.start);
                        const disabled = slot.disabled === true;
                        const text = slot.label ?? (0, format_1.clockLabel)(slot.start);
                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityLabel: text, accessibilityState: { selected, disabled }, disabled: disabled, onPress: () => onSelect?.(slot.start, slot), style: ({ pressed }) => ({
                                paddingVertical: tokens.spacing.sm,
                                paddingHorizontal: tokens.spacing.md,
                                borderRadius: tokens.radius.full,
                                borderWidth: 1,
                                borderColor: selected ? colors.primary : colors.border,
                                backgroundColor: disabled
                                    ? tokens.ramps.neutral[100]
                                    : selected
                                        ? colors.primary
                                        : pressed
                                            ? (0, format_1.withAlpha)(colors.primary, 0.12)
                                            : colors.surface,
                                opacity: disabled ? 0.6 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: disabled ? colors.muted : selected ? colors.onPrimary : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: selected ? '800' : '500',
                                    textDecorationLine: disabled ? 'line-through' : 'none',
                                }, children: text }) }, slot.start.toISOString() + i));
                    }) })] }, group.period))) }));
}
//# sourceMappingURL=AvailabilityPickerV2.js.map