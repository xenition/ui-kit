"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHeader = ChatHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const PresenceDot_1 = require("./PresenceDot");
/**
 * Top bar for a conversation screen — optional back button, tappable
 * avatar+title block with a presence badge and subtitle (or a "typing…"
 * caption), and trailing action buttons. Uses the `header` role. No literal
 * colors.
 */
function ChatHeader({ title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "header", style: [
            // Appearance FIRST; classic keeps the historical surface + bottom divider.
            appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: appearance === 'classic' ? colors.surface : undefined,
            },
            style,
        ], children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2039", color: "primary", size: "2xl" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPressTitle, disabled: !onPressTitle, style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "md", src: avatarUri, name: title }), presence ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', bottom: -1, right: -1 }, children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), typing ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLiveRegion: "polite", numberOfLines: 1, style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs }, children: "typing\u2026" })) : subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null] })] }), actions?.map((action) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: action.label, onPress: action.onPress, hitSlop: 8, style: { padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: action.glyph, color: "primary" }) }, action.id)))] }));
}
//# sourceMappingURL=ChatHeader.js.map