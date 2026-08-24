"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBlock = EventBlock;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
/**
 * A single event chip/block — the shared visual atom for `WeekView`,
 * `TimeGrid`, `DayAgenda` and `AllDayRow`. A left accent bar keeps the tone
 * legible even in `soft`/`outline` variants (never color-alone), and selection
 * is exposed through `accessibilityState.selected`. Tone resolves to a theme
 * color pair via `resolveTone`; every color traces to a token.
 */
function EventBlock({ event, variant = 'soft', size = 'md', selected = false, onPress, height, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { base, on } = (0, format_1.resolveTone)(colors, event.tone);
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const bg = solid ? base : outline ? colors.surface : (0, format_1.withAlpha)(base, 0.16);
    const fg = solid ? on : colors.onSurface;
    const meta = solid ? (0, format_1.withAlpha)(on, 0.85) : colors.muted;
    const timeText = event.allDay ? 'All day' : (0, format_1.timeRangeLabel)(event.start, event.end);
    const label = `${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected }, disabled: onPress == null, onPress: () => onPress?.(event), style: ({ pressed }) => [
            {
                flexDirection: 'row',
                overflow: 'hidden',
                borderRadius: tokens.radius.sm,
                backgroundColor: bg,
                borderWidth: outline || selected ? 1 : 0,
                borderColor: selected ? base : colors.border,
                opacity: pressed ? 0.85 : 1,
                minHeight: height,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.xs, backgroundColor: base } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: fg,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                        }, children: event.title }), size === 'md' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: meta, fontSize: tokens.typography.scale.xs }, children: [timeText, event.location ? ` · ${event.location}` : ''] })) : null] })] }));
}
//# sourceMappingURL=EventBlock.js.map