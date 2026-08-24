"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBlockV2 = EventBlockV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const format_1 = require("./format");
/** A tone → contrast-safe *Text slot, so tone-colored labels stay legible. */
function toneText(colors, tone = 'primary') {
    switch (tone) {
        case 'accent':
            return colors.accentText;
        case 'success':
            return colors.successText;
        case 'warn':
            return colors.warnText;
        case 'danger':
            return colors.dangerText;
        case 'neutral':
            return colors.muted;
        case 'primary':
        default:
            return colors.primaryText;
    }
}
/**
 * EventBlock, redesigned (v2): a **filled, tone-tinted block** with a thick
 * left accent rail and the time set as its own leading column. The tint fills
 * the whole block (never color-alone — the rail + bold title + a11y state carry
 * the tone), and a press-scale spring gives it tap feedback. Distinct at a
 * glance from v1's flat chip. Same props, token-pure.
 */
function EventBlockV2({ event, variant = 'soft', size = 'md', selected = false, onPress, height, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { base } = (0, format_1.resolveTone)(colors, event.tone);
    const press = (0, motion_1.usePressScale)(0.98);
    const timeText = event.allDay ? 'All day' : (0, format_1.timeRangeLabel)(event.start, event.end);
    const label = `${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`;
    const startText = event.allDay ? 'All day' : (0, format_1.timeRangeLabel)(event.start);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected }, disabled: onPress == null, onPress: () => onPress?.(event), onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: [
                {
                    flexDirection: 'row',
                    overflow: 'hidden',
                    alignItems: 'stretch',
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, format_1.withAlpha)(base, 0.16),
                    borderWidth: selected ? 1.5 : 0,
                    borderColor: base,
                    minHeight: height,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.sm, backgroundColor: base } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        paddingVertical: size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm,
                        paddingHorizontal: size === 'sm' ? tokens.spacing.sm : tokens.spacing.md,
                        justifyContent: 'center',
                        gap: 2,
                        flex: 1,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: toneText(colors, event.tone),
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: '800',
                                    }, children: startText }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        flex: 1,
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '700',
                                    }, children: event.title })] }), size === 'md' && event.location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: event.location })) : null] })] }) }));
}
//# sourceMappingURL=EventBlockV2.js.map