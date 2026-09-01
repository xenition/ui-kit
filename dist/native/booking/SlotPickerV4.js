"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotPickerV4 = SlotPickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const datetime_1 = require("../../booking/datetime");
const schedule_v4_1 = require("../../booking/schedule-v4");
/**
 * **V4 slot picker** — same props as {@link SlotPicker} plus `grouped`,
 * `periodLabels`, `formatSpots` and `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **A day of slots has structure.** See `grouped`.
 * 2. **A full slot is disabled at M3's opacity, not at 0.5.** `0.38` is the
 *    number the whole kit uses for "you cannot have this"; 0.5 was this
 *    component's own guess and read as "dimmed for some reason".
 * 3. **Press is a state layer over the chip's own fill.** The base pressed to
 *    `tokens.ramps.primary[50]` — the light end of the ramp in both schemes,
 *    so on a dark page a pressed slot flashed near-white.
 * 4. **Chips clear 44 and their type comes from `TextV4`.** The base set
 *    `paddingVertical: spacing.sm` with no minimum height, so a compact seed
 *    produced a chip a finger could miss.
 * 5. **The copy is the host's** — `formatSpots`, `periodLabels`,
 *    `emptyMessage`, on top of the `fullLabel` the base already had.
 *
 * Still a controlled component: it computes nothing it does not display, and
 * an empty `slots` renders the message rather than a blank grid.
 */
function SlotPickerV4({ slots, onPick, selected, formatTime, timeZone, columns = 3, lowSpotsThreshold = 3, fullLabel = 'Full', grouped = true, periodLabels, formatSpots, emptyMessage = 'No times available.', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const format = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, timeZone));
    const selectedStart = typeof selected === 'string' ? selected : (selected?.startsAt ?? null);
    const spots = formatSpots ?? ((n, low) => (low ? `${n} left` : `${n} open`));
    const list = slots ?? [];
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyMessage }) }));
    }
    const groups = grouped
        ? (0, schedule_v4_1.groupSlotsByPeriod)(list, timeZone)
        : [{ period: 'morning', slots: list }];
    const chip = (slot) => {
        const full = slot.spotsLeft <= 0;
        const isSelected = selectedStart === slot.startsAt;
        const low = !full && slot.spotsLeft <= lowSpotsThreshold;
        const hint = full ? fullLabel : spots(slot.spotsLeft, low);
        const timeLabel = format(slot.startsAt);
        const fill = isSelected ? colors.primary : colors.card;
        const ink = isSelected ? colors.onPrimary : colors.onCard;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${timeLabel}, ${hint}`, accessibilityState: { selected: isSelected, disabled: full }, disabled: full, onPress: () => onPick?.(slot), style: ({ pressed }) => ({
                flex: 1,
                minHeight: tap,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: pressed && !full ? (0, state_v4_1.pressOver)(theme, fill, ink) : fill,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, full),
            }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", numeric: "tabular", style: { color: ink }, children: timeLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", 
                    // A low-spots hint is genuinely a caution — it is the fact that makes
                    // a user hurry — so it keeps `warn`. A plain count does not.
                    style: {
                        color: isSelected
                            ? colors.onPrimary
                            : low && !full
                                ? colors.warnText
                                : colors.mutedText,
                    }, children: hint })] }, slot.startsAt));
    };
    /** One bucket's chips, wrapped into rows of `columns` and never clipped. */
    const grid = (bucket) => {
        const rows = [];
        for (let i = 0; i < bucket.length; i += columns)
            rows.push(bucket.slice(i, i + columns));
        return rows.map((row, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [row.map(chip), Array.from({ length: columns - row.length }, (_, k) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }, `pad-${k}`)))] }, i)));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: groups.map((group) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [grouped ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", children: periodLabels?.[group.period] ?? schedule_v4_1.PERIOD_LABEL[group.period] })) : null, grid(group.slots)] }, group.period))) }));
}
//# sourceMappingURL=SlotPickerV4.js.map