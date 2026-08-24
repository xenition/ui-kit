"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumCard = AlbumCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
/**
 * A photo-album tile — cover image, title, photo count, and an optional date.
 * `variant` switches a full-bleed `cover` card, a horizontal `list` row, and a
 * dense `compact` tile. A private album shows a labelled `Badge` (never color
 * alone). Reuses the `Badge` primitive; `onPress` makes the whole card a
 * `button`. Token-only — cover placeholder and surfaces trace to theme tokens.
 */
function AlbumCard({ title, photoCount, dateText, coverUrl, isPrivate = false, variant = 'cover', loading = false, onPress, countLabel = 'photos', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const horizontal = variant === 'list';
    const coverHeight = variant === 'compact' ? 96 : 160;
    const containerStyle = [
        {
            flexDirection: horizontal ? 'row' : 'column',
            gap: tokens.spacing.md,
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: horizontal ? tokens.spacing.md : 0,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading album", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: horizontal ? 88 : '100%',
                        height: horizontal ? 88 : coverHeight,
                        borderRadius: tokens.radius.md,
                        backgroundColor: tokens.ramps.neutral[200],
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm, padding: horizontal ? 0 : tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: horizontal ? 88 : '100%',
            height: horizontal ? 88 : coverHeight,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: tokens.ramps.neutral[100],
        }, children: coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverUrl }, accessible: true, accessibilityLabel: title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }));
    const metaBits = [];
    if (typeof photoCount === 'number')
        metaBits.push(`${photoCount} ${countLabel}`);
    if (dateText)
        metaBits.push(dateText);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, padding: horizontal ? 0 : tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), isPrivate ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "warn", variant: "soft", size: "sm", children: "Private" })) : null] }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaBits.join(' · ') })) : null] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}${typeof photoCount === 'number' ? `, ${photoCount} ${countLabel}` : ''}${isPrivate ? ', private' : ''}`, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=AlbumCard.js.map