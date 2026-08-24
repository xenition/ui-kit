"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionRowV3 = PrescriptionRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    active: { glyph: '●', label: 'Active', color: 'successText' },
    'refill-due': { glyph: '↻', label: 'Refill due', color: 'warnText' },
    paused: { glyph: '⏸', label: 'Paused', color: 'muted' },
    expired: { glyph: '✕', label: 'Expired', color: 'dangerText' },
};
/**
 * PrescriptionRow, redesigned (v3): a **dense line with a status chip**. The
 * drug name and (middot-joined) dose / directions share one flexible line, and
 * a compact tinted status chip (glyph + word) hugs the right edge. No pill tile,
 * no card, no separate refill button — a lean formulary line tuned for long med
 * lists (a refill-due row still reads its "↻ Refill due" chip). Distinct at a
 * glance from v1's row and v2's card. Same props, token-pure.
 */
function PrescriptionRowV3({ name, dose, frequency, refillsLeft, status = 'active', onRefill, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const meta = STATUS_META[status];
    const statusColor = colors[meta.color];
    const detail = [dose, frequency, refillsLeft != null ? `${refillsLeft} left` : undefined]
        .filter(Boolean)
        .join(' · ');
    const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;
    // A refill-due row prefers the refill handler; otherwise the row press.
    const handler = status === 'refill-due' && onRefill ? onRefill : onPress;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                minHeight: 44,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), detail !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(statusColor, 0.1),
                    borderWidth: 1,
                    borderColor: (0, color_1.withAlpha)(statusColor, 0.2),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })] }));
    if (!handler) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: handler, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=PrescriptionRowV3.js.map