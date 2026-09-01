"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceRowV4 = RecurrenceRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const SegmentedV4_1 = require("../primitives/SegmentedV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
/** The default options, in the order a scheduler offers them. */
const FREQ_LABEL = {
    none: 'Does not repeat',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
};
const FREQ_ORDER = ['none', 'daily', 'weekly', 'monthly', 'yearly'];
/**
 * **V4 recurrence row** — same props as {@link RecurrenceRow} plus
 * `freqLabels`.
 *
 * ## Three changes
 *
 * 1. **The inline variant is `SegmentedV4`**, not five hand-rolled chips, so
 *    it announces itself as one control with a selected option rather than as
 *    five independent buttons.
 * 2. **The summary variant is a row from the shared row line**, with a
 *    chevron that says it opens something — the base rendered a bare line of
 *    text that happened to be pressable.
 * 3. **All five words are props**, and the row is announced as
 *    "Repeats, Weekly" rather than as two loose fragments.
 */
function RecurrenceRowV4({ value, onChange, label = 'Repeats', variant = 'summary', onPress, options, freqLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const wordFor = (freq) => options?.find((o) => o.value === freq)?.label ?? freqLabels?.[freq] ?? FREQ_LABEL[freq];
    const choices = options?.map((o) => o.value) ?? FREQ_ORDER;
    const current = wordFor(value);
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: label }), (0, jsx_runtime_1.jsx)(SegmentedV4_1.SegmentedV4, { options: choices.map((f) => ({ label: wordFor(f), value: f })), value: value, onChange: (v) => onChange?.(v) })] }));
    }
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, {}),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "refresh", size: "lg", color: "mutedText" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", children: label }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: current }), onPress ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chevron-right", size: "lg", color: "mutedText" }) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: `${label}, ${current}`, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}, ${current}`, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=RecurrenceRowV4.js.map