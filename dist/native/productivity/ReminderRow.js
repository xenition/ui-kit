"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderRow = ReminderRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const DueDatePill_1 = require("./DueDatePill");
/**
 * A reminder line: title, an optional time {@link DueDatePill}, and a bell toggle
 * that reads as primary (on) or muted (off) and exposes a `switch` a11y role with
 * a stateful label. No literal colors.
 */
function ReminderRow({ title, timeLabel, tone = 'upcoming', enabled = true, onToggle, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, disabled: !onPress, style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: enabled ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '500',
                        }, children: title }), timeLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: timeLabel, tone: tone, glyph: "\u23F0" }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "switch", accessibilityState: { checked: enabled }, accessibilityLabel: `${title} reminder`, onPress: () => onToggle?.(!enabled), hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1, padding: tokens.spacing.xs }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: enabled ? colors.primaryText : colors.muted, fontSize: tokens.typography.scale.lg }, children: enabled ? '🔔' : '🔕' }) })] }));
}
//# sourceMappingURL=ReminderRow.js.map