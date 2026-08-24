"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityPicker = AvailabilityPicker;
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
 * A tap-to-book availability grid — bookable time slots laid out in a wrapping
 * grid, with disabled (blocked) slots rendered but not selectable. Selection is
 * exposed via `accessibilityState.selected` and a filled tile (not color-alone).
 * Includes empty + loading states. Token colors only.
 */
function AvailabilityPicker({ slots = [], value = null, multiple = false, columns = 3, onSelect, loading = false, emptyLabel = 'No times available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cols = Math.max(1, Math.floor(columns));
    const widthPct = `${100 / cols}%`;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: "Loading times", style: [{ flexDirection: 'row', flexWrap: 'wrap' }, style], children: Array.from({ length: cols * 2 }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: widthPct, padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.xl, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }) }, i))) }));
    }
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: emptyLabel, style: [{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: [{ flexDirection: 'row', flexWrap: 'wrap' }, style], children: slots.map((slot, i) => {
            const selected = isSelected(value, slot.start);
            const disabled = slot.disabled === true;
            const text = slot.label ?? (0, format_1.clockLabel)(slot.start);
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: widthPct, padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityLabel: text, accessibilityState: { selected, disabled }, disabled: disabled, onPress: () => onSelect?.(slot.start, slot), style: ({ pressed }) => ({
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: tokens.spacing.sm,
                        borderRadius: tokens.radius.sm,
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
                            fontWeight: selected ? '700' : '500',
                            textDecorationLine: disabled ? 'line-through' : 'none',
                        }, children: text }) }) }, slot.start.toISOString() + i));
        }) }));
}
//# sourceMappingURL=AvailabilityPicker.js.map