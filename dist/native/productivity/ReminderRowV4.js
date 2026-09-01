"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderRowV4 = ReminderRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const DueDatePill_1 = require("./DueDatePill");
/**
 * ReminderRow — **V4** "flow" design. The focused-workspace take on a reminder
 * line: a bell glyph seated in a **soft-primary disc**, a bigger legible title
 * over its time {@link DueDatePill}, and an enable toggle exposing a `switch`
 * a11y role with a stateful label. When the reminder is enabled the whole row
 * settles into a calm **soft-primary tint** so an active reminder reads at a
 * glance. Same props/behavior as {@link ReminderRowProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
function ReminderRowV4({ title, timeLabel, tone = 'upcoming', enabled = true, onToggle, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                backgroundColor: enabled ? (0, color_1.withAlpha)(colors.primary, 0.08) : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: enabled ? (0, color_1.withAlpha)(colors.primary, 0.14) : (0, color_1.withAlpha)(colors.border, 0.5),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: enabled ? colors.primaryText : colors.mutedText, fontSize: tokens.typography.scale.lg }, children: enabled ? '🔔' : '🔕' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, disabled: !onPress, style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: enabled ? colors.onSurface : colors.mutedText,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                        }, children: title }), timeLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: timeLabel, tone: tone, glyph: "\u23F0" }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "switch", accessibilityState: { checked: enabled }, accessibilityLabel: `${title} reminder`, onPress: () => onToggle?.(!enabled), hitSlop: 8, style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: enabled ? colors.primaryText : colors.mutedText, fontSize: tokens.typography.scale.lg }, children: enabled ? '🔔' : '🔕' }) })] }));
}
//# sourceMappingURL=ReminderRowV4.js.map