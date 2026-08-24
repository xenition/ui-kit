"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHeaderV3 = ChatHeaderV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const PresenceDot_1 = require("./PresenceDot");
/**
 * ChatHeader — **compact centered** variant. A slim iOS-style bar: back button
 * pinned far-left, trailing actions pinned far-right, and a small `xs` avatar
 * stacked above a centered title + subtitle in the middle. Minimal height, no
 * large avatar — the counterpart to the roomy v2 header. Same props as
 * `ChatHeader`. No literal colors.
 */
function ChatHeaderV3({ title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "header", style: [
            appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: appearance === 'classic' ? colors.surface : undefined,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, flexDirection: 'row', alignItems: 'center' }, children: onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2039", color: "primary", size: "2xl" }) })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPressTitle, disabled: !onPressTitle, style: { flex: 1, alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xs", src: avatarUri, name: title }), presence ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', bottom: -2, right: -2 }, children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence, size: 7 }) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                            textAlign: 'center',
                        }, children: title }), typing ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", numberOfLines: 1, style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "typing\u2026" })) : subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: subtitle })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 64,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: tokens.spacing.xs,
                }, children: actions?.map((action) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: action.label, onPress: action.onPress, hitSlop: 8, style: { padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: action.glyph, color: "primary", size: "lg" }) }, action.id))) })] }));
}
//# sourceMappingURL=ChatHeaderV3.js.map