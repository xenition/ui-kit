"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherCard = TeacherCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * TeacherCard — an instructor row on a clean card: a soft primary-tinted avatar
 * circle, the teacher's name, specialty and session count, and (when `onFollow`
 * is wired) a Follow/Following button. The card stays calm — surface, border,
 * `onSurface`/`mutedText` text — with the only tint on the avatar; follow state
 * lives in the button's label and variant, not in color alone. The whole row is
 * pressable when `onPress` is set. Token-only colors.
 */
function TeacherCard({ name, specialty, avatarGlyph = '🧑‍🏫', sessions, following = false, onPress, onFollow, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: avatarGlyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), specialty ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: specialty })) : null, sessions != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: `${sessions} sessions` })) : null] }), onFollow ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: following ? 'secondary' : 'primary', size: "sm", onPress: onFollow, accessibilityState: { selected: following }, children: following ? 'Following' : 'Follow' })) : null] }));
    const cardStyle = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: ({ pressed }) => [cardStyle, { opacity: pressed ? 0.85 : 1 }], children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: cardStyle, children: body });
}
//# sourceMappingURL=TeacherCard.js.map