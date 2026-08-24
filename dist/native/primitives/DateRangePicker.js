"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangePicker = DateRangePicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DatePicker_1 = require("./DatePicker");
/**
 * Two-ended date range — composes two native {@link DatePicker}s (start + end)
 * and keeps them consistent: the start's `max` is bounded by the chosen end and
 * the end's `min` by the chosen start, so an invalid crossing can't be picked.
 * Labels, gaps, and text all read from `useXenitionTheme()`. No literal colors.
 */
function DateRangePicker({ value = { start: null, end: null }, onChange, min, max, startLabel = 'Start', endLabel = 'End', locale, invalid = false, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const setStart = (start) => {
        // Clear a now-invalid end (earlier than the new start).
        const end = value.end && start > value.end ? null : value.end;
        onChange?.({ start, end });
    };
    const setEnd = (end) => {
        const start = value.start && end < value.start ? null : value.start;
        onChange?.({ start, end });
    };
    const labelStyle = {
        color: colors.onSurface,
        fontSize: tokens.typography.scale.sm,
        fontWeight: '600',
        marginBottom: tokens.spacing.xs,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: labelStyle, children: startLabel }), (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { value: value.start, onChange: setStart, min: min, max: value.end ?? max, locale: locale, invalid: invalid, disabled: disabled, accessibilityLabel: startLabel, placeholder: "Start date" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: labelStyle, children: endLabel }), (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, { value: value.end, onChange: setEnd, min: value.start ?? min, max: max, locale: locale, invalid: invalid, disabled: disabled, accessibilityLabel: endLabel, placeholder: "End date" })] })] }));
}
//# sourceMappingURL=DateRangePicker.js.map