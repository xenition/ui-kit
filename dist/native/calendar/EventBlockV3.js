"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBlockV3 = EventBlockV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
/**
 * EventBlock, redesigned (v3): an **outline block** — no fill, a hairline
 * border, and a small tone dot before the title. The airy, line-based look
 * reads as a lightweight list item rather than a filled chip. Selection thickens
 * the border and is announced via a11y (never color-alone). Same props,
 * token-pure.
 */
function EventBlockV3({ event, variant = 'outline', size = 'md', selected = false, onPress, height, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { base } = (0, format_1.resolveTone)(colors, event.tone);
    const timeText = event.allDay ? 'All day' : (0, format_1.timeRangeLabel)(event.start, event.end);
    const label = `${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected }, disabled: onPress == null, onPress: () => onPress?.(event), style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                borderWidth: selected ? 1.5 : 1,
                borderColor: selected ? base : colors.border,
                paddingVertical: size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm,
                paddingHorizontal: size === 'sm' ? tokens.spacing.sm : tokens.spacing.md,
                opacity: pressed ? 0.85 : 1,
                minHeight: height,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: tokens.spacing.sm,
                    height: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: base,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: event.title }), size === 'md' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [timeText, event.location ? ` · ${event.location}` : ''] })) : null] })] }));
}
//# sourceMappingURL=EventBlockV3.js.map