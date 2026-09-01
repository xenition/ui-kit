"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrrigationScheduleV4 = IrrigationScheduleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const SwitchV4_1 = require("../primitives/SwitchV4");
const TextV4_1 = require("../primitives/TextV4");
const farm_v4_1 = require("./internal/farm-v4");
/** Run state → tone and default label. Genuinely a status, so the tones stay. */
const STATE_META = {
    scheduled: { label: 'Scheduled', tone: 'neutral' },
    running: { label: 'Running', tone: 'primary' },
    done: { label: 'Done', tone: 'success' },
    skipped: { label: 'Skipped', tone: 'warn' },
};
/**
 * **V4 irrigation schedule** — same props as {@link IrrigationSchedule} plus
 * `stateLabels` and `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The per-zone toggle is `SwitchV4`.** The base drew its own, so the one
 *    control on this card a user actually operates did not match the switches
 *    anywhere else in the product — different size, different travel, no focus
 *    ring.
 * 2. **A disabled zone dims at M3's 0.38** and says `disabled` through
 *    `accessibilityState`, rather than only losing colour.
 * 3. **The empty state gets a description**, not just a title, so a schedule
 *    with nothing in it explains itself.
 * 4. **Type comes from `TextV4`** and captions take `mutedText`.
 *
 * Still fully controlled: `onToggle` reports, the component stores nothing.
 */
function IrrigationScheduleV4({ slots, title = 'Irrigation', onToggle, emptyTitle = 'No runs scheduled', emptyDescription = 'Zones you schedule will appear here.', stateLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const list = Array.isArray(slots) ? slots : [];
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCA6", size: "base" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", style: { flex: 1 }, children: title })] }), list.length === 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, paddingVertical: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", align: "center", children: emptyTitle }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: emptyDescription })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: list.map((slot, i) => {
                    const meta = STATE_META[slot.state ?? 'scheduled'];
                    const label = stateLabels?.[slot.state ?? 'scheduled'] ?? meta.label;
                    const enabled = slot.enabled ?? true;
                    const caption = (0, farm_v4_1.metaLine)([slot.time, slot.duration]);
                    const last = i === list.length - 1;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.sm,
                            borderBottomWidth: last ? 0 : 1,
                            borderBottomColor: colors.border,
                            // A disabled zone keeps its box and loses its ink.
                            opacity: enabled ? 1 : theme.state.disabledContent,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, children: slot.zone }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", numberOfLines: 1, children: caption })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label }), onToggle ? ((0, jsx_runtime_1.jsx)(SwitchV4_1.SwitchV4, { checked: enabled, onCheckedChange: (next) => onToggle(slot.id, next), accessibilityLabel: slot.zone })) : null] }, slot.id));
                }) }))] }));
}
//# sourceMappingURL=IrrigationScheduleV4.js.map