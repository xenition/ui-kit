"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerCard = SpeakerCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
/**
 * Speaker profile card built on the `Avatar` and `Rating` primitives. `row`
 * lays the avatar beside the details for lists; `stacked` centers a larger
 * avatar for a profile header. Role and company collapse gracefully when
 * absent. Colors come from the compiled theme tokens; no literal colors.
 */
function SpeakerCard({ name, role, company, avatarUrl, bio, rating, tags = [], variant = 'row', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const stacked = variant === 'stacked';
    const roleLine = [role, company].filter(Boolean).join(' · ');
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: stacked ? 'column' : 'row',
            alignItems: stacked ? 'center' : 'flex-start',
            gap: tokens.spacing.md,
            padding: tokens.spacing.lg,
        }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: stacked ? 'lg' : 'md' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: stacked ? undefined : 1, alignItems: stacked ? 'center' : 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: stacked ? 'center' : 'left' }, children: name }), roleLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: stacked ? 'center' : 'left' }, children: roleLine })) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: stacked ? 3 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, textAlign: stacked ? 'center' : 'left' }, children: bio })) : null, tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, justifyContent: stacked ? 'center' : 'flex-start' }, children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: t }, `${t}-${i}`))) })) : null] })] }));
    const containerStyle = [
        {
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: content });
}
//# sourceMappingURL=SpeakerCard.js.map