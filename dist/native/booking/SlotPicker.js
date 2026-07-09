"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotPicker = SlotPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const datetime_1 = require("../../booking/datetime");
const startOf = (s) => s == null ? null : typeof s === 'string' ? s : s.startsAt;
/**
 * Grid of bookable times for one day — the native mirror of the web
 * `SlotPicker`. Same `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/
 * `columns`/`fullLabel` contract (`onPick` is the native idiom for the web
 * click). A `FlatList` of `Pressable` time chips: a full slot
 * (`spotsLeft === 0`) is disabled and shows the `fullLabel`, low remaining
 * capacity surfaces a "{n} left" hint, and the selected chip fills with the
 * primary token. Accessible: each chip is a `button` with
 * `accessibilityState={{ selected, disabled }}`. Token-only.
 */
function SlotPicker({ slots, onPick, selected, formatTime, timeZone, columns = 3, lowSpotsThreshold = 3, fullLabel = 'Full', style, scrollEnabled, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const format = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, timeZone));
    const selectedStart = startOf(selected);
    const gap = tokens.spacing.sm;
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: slots, numColumns: columns, scrollEnabled: scrollEnabled, keyExtractor: (slot) => slot.startsAt, columnWrapperStyle: { gap }, contentContainerStyle: [{ gap }, style], renderItem: ({ item: slot }) => {
            const full = slot.spotsLeft <= 0;
            const isSelected = selectedStart === slot.startsAt;
            const low = !full && slot.spotsLeft <= lowSpotsThreshold;
            const hint = full ? fullLabel : low ? `${slot.spotsLeft} left` : `${slot.spotsLeft} open`;
            const timeLabel = format(slot.startsAt);
            const fg = isSelected ? colors.onPrimary : colors.onSurface;
            const hintColor = isSelected ? colors.onPrimary : colors.muted;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${timeLabel}, ${hint}`, accessibilityState: { selected: isSelected, disabled: full }, disabled: full, onPress: () => onPick?.(slot), style: ({ pressed }) => ({
                    flex: 1,
                    alignItems: 'center',
                    gap: 2,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected
                        ? colors.primary
                        : pressed && !full
                            ? tokens.ramps.primary[50]
                            : colors.surface,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    opacity: full ? 0.5 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: timeLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: hintColor, fontSize: tokens.typography.scale.xs }, children: hint })] }));
        }, ListEmptyComponent: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No times available." }) }) }, `cols-${columns}`));
}
//# sourceMappingURL=SlotPicker.js.map