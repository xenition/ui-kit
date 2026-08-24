"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotPickerV3 = SlotPickerV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const datetime_1 = require("../../booking/datetime");
const color_1 = require("../primitives/internal/color");
const startOf = (s) => s == null ? null : typeof s === 'string' ? s : s.startsAt;
/**
 * SlotPicker — design variant **V3**: a **vertical list of full-width time
 * rows**, each pairing the time with a capacity {@link Badge}. Where V1 is a
 * chip grid, V3 reads like a schedule — one row per slot, time on the left,
 * remaining-capacity badge on the right (success = open, warn = low, neutral =
 * `fullLabel`). A full slot is disabled and dimmed; the selected row is banded
 * with a primary-tinted fill and a leading primary rail (state shown by fill +
 * shape, never hue alone). Same
 * `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/`lowSpotsThreshold`/
 * `fullLabel`/`scrollEnabled` contract as {@link SlotPickerProps}
 * (`columns` is accepted for drop-in parity). Token-only.
 */
function SlotPickerV3({ slots, onPick, selected, formatTime, timeZone, lowSpotsThreshold = 3, fullLabel = 'Full', style, scrollEnabled, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const format = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, timeZone));
    const selectedStart = startOf(selected);
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: slots, scrollEnabled: scrollEnabled, keyExtractor: (slot) => slot.startsAt, contentContainerStyle: [{ gap: tokens.spacing.sm }, style], renderItem: ({ item: slot }) => {
            const full = slot.spotsLeft <= 0;
            const isSelected = selectedStart === slot.startsAt;
            const low = !full && slot.spotsLeft <= lowSpotsThreshold;
            const hint = full ? fullLabel : low ? `${slot.spotsLeft} left` : `${slot.spotsLeft} open`;
            const tone = full ? 'neutral' : low ? 'warn' : 'success';
            const timeLabel = format(slot.startsAt);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${timeLabel}, ${hint}`, accessibilityState: { selected: isSelected, disabled: full }, disabled: full, onPress: () => onPick?.(slot), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderLeftWidth: isSelected ? 4 : 1,
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected
                        ? (0, color_1.withAlpha)(colors.primary, 0.1)
                        : pressed && !full
                            ? (0, color_1.withAlpha)(colors.primary, 0.06)
                            : colors.surface,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: full ? 0.55 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: isSelected ? colors.primaryText : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: isSelected ? '700' : '500',
                        }, children: timeLabel }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: tone, variant: "soft", size: "md", children: hint })] }));
        }, ListEmptyComponent: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No times available." }) }) }));
}
//# sourceMappingURL=SlotPickerV3.js.map