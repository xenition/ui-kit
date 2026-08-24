"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHeaderV2 = ChatHeaderV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const PresenceDot_1 = require("./PresenceDot");
/**
 * ChatHeader — **prominent** variant. A taller bar with a large `lg` avatar, a
 * big `2xl` title, and the presence/subtitle as a colored status line
 * (success-tinted when online). Trailing actions render as filled circular
 * buttons in a primary-tinted well — the call/video affordance reads as a real
 * button, not a bare glyph. Elevated with a drop shadow instead of a divider.
 * Same props as `ChatHeader`. No literal colors.
 */
function ChatHeaderV2({ title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const online = presence === 'online';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "header", style: [
            appearance === 'classic'
                ? { backgroundColor: colors.surface, ...(0, elevation_1.shadow)('md', tokens) }
                : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
            },
            style,
        ], children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2039", color: "primary", size: "3xl" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPressTitle, disabled: !onPressTitle, style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", src: avatarUri, name: title, ring: online, status: presence }), presence ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', bottom: 0, right: 0 }, children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence, size: 12 }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale['2xl'],
                                    fontWeight: '800',
                                }, children: title }), typing ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", numberOfLines: 1, style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "typing\u2026" })) : subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: online ? colors.successText : colors.muted,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: online ? '600' : '400',
                                }, children: subtitle })) : null] })] }), actions?.map((action) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: action.label, onPress: action.onPress, hitSlop: 8, style: ({ pressed }) => ({
                    width: 42,
                    height: 42,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, pressed ? 0.22 : 0.12),
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: action.glyph, color: "primary" }) }, action.id)))] }));
}
//# sourceMappingURL=ChatHeaderV2.js.map