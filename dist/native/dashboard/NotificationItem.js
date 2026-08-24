"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationItem = NotificationItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Token-derived translucent tint — takes a theme hex, never invents one.
 * Mirrors the helper the domain modules already use for the same job.
 */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * A single notification row: title, optional body, timestamp, and an unread
 * indicator. Pressable when `onPress` is supplied. Token-only.
 */
function NotificationItem({ title, body, time, unread = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                /*
                  `muted` is the de-emphasised TEXT colour, not a surface tint. Using
                  it as the unread background painted the row the same colour as its
                  own body line — measured at 1.00:1, literally invisible — and left
                  the title at 2.12:1 against it, in light and dark alike.
      
                  A tint is what was wanted, so derive one: the primary at 12% over the
                  surface, the same recipe the domain modules use for their tinted
                  rows. Unread now reads as a wash of the brand colour, and every text
                  colour keeps the contrast it has everywhere else.
                */
                backgroundColor: unread ? withAlpha(colors.primary, 0.12) : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 8,
                    height: 8,
                    borderRadius: tokens.radius.full,
                    marginTop: 6,
                    backgroundColor: unread ? colors.primary : 'transparent',
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: unread ? '700' : '500',
                        }, children: title }), body ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: body })) : null] }), time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${title}${unread ? ', unread' : ''}`, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}${unread ? ', unread' : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=NotificationItem.js.map