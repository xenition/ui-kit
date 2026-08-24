"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileHeader = ProfileHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Profile / account header: avatar, name, subtitle, and a trailing action slot.
 * The native mirror of the block that tops most account and settings screens.
 * Token-only.
 */
function ProfileHeader({ name, subtitle, avatarUrl, actions, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "header", style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.xl,
                            fontWeight: '700',
                        }, children: name }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] }), actions ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: actions }) : null] }));
}
//# sourceMappingURL=ProfileHeader.js.map