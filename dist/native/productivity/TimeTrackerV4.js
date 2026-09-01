"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerV4 = TimeTrackerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * TimeTracker — **V4** "flow" design. The focused-workspace take on a stopwatch:
 * a **big, monospaced-feel elapsed numeral** with the context label beneath, and
 * a large (≥44px) round start/stop control that reads **primary** when idle and
 * flips to **danger "stop"** while running. A live session lifts the whole card
 * into a soft-primary running glow so the timer reads as alive without shouting.
 * Keeps the running/elapsed contract of {@link TimeTrackerProps}; token-only
 * colors via `useXenitionTheme()` + `withAlpha`.
 */
function TimeTrackerV4({ elapsedLabel, running = false, onToggle, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = running ? colors.danger : colors.primary;
    const onAccent = running ? colors.onDanger : colors.onPrimary;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: running ? (0, color_1.withAlpha)(colors.primary, 0.5) : colors.border,
                backgroundColor: running ? (0, color_1.withAlpha)(colors.primary, 0.08) : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: running ? colors.primaryText : colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                            letterSpacing: -0.5,
                        }, children: elapsedLabel }), label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: label })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: running }, accessibilityLabel: running ? 'Stop timer' : 'Start timer', onPress: () => onToggle?.(!running), style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: accent,
                    opacity: pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onAccent, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: running ? '■' : '▶' }) })] }));
}
//# sourceMappingURL=TimeTrackerV4.js.map