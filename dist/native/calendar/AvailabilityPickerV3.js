"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityPickerV3 = AvailabilityPickerV3;
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
/**
 * AvailabilityPicker, redesigned (v3): **full-width vertical time rows**. Each
 * bookable window is its own tappable line — time on the left, a check/radio
 * indicator on the right — so the list scans top-to-bottom like a booking sheet.
 * The selected row fills and shows a check (never color-alone); blocked rows are
 * struck-through and inert. Empty + loading states included. Same props,
 * token-pure.
 */
function AvailabilityPickerV3({ slots = [], value = null, multiple = false, onSelect, loading = false, emptyLabel = 'No times available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: "Loading times", style: style, children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing['2xl'], borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100], marginBottom: tokens.spacing.sm } }, i))) }));
    }
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: emptyLabel, style: [{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: [{ gap: tokens.spacing.sm }, style], children: slots.map((slot, i) => {
            const selected = isSelected(value, slot.start);
            const disabled = slot.disabled === true;
            const text = slot.label ?? (0, format_1.clockLabel)(slot.start);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityLabel: text, accessibilityState: { selected, disabled }, disabled: disabled, onPress: () => onSelect?.(slot.start, slot), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
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
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: disabled ? colors.muted : selected ? colors.onPrimary : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: selected ? '800' : '500',
                            textDecorationLine: disabled ? 'line-through' : 'none',
                        }, children: text }), disabled ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Booked" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing.lg,
                            height: tokens.spacing.lg,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: selected ? 0 : 1.5,
                            borderColor: colors.border,
                            backgroundColor: selected ? colors.onPrimary : 'transparent',
                        }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: "\u2713" })) : null }))] }, slot.start.toISOString() + i));
        }) }));
}
//# sourceMappingURL=AvailabilityPickerV3.js.map