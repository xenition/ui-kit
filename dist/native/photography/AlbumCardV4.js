"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumCardV4 = AlbumCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const color_1 = require("../primitives/internal/color");
/**
 * AlbumCard — **V4** "studio" design. The matted, image-forward take on an album
 * tile: an elevated card whose cover photo floats inside a thin neutral **mat**,
 * a bold title, and the photo-count as a small soft-primary chip with the date
 * trailing. Honors all three `variant` layouts — `cover` (matted photo on top),
 * `list` (horizontal matted thumbnail), and `compact` (dense) — identical
 * props/behavior to {@link AlbumCardProps}. A private album carries a labelled
 * `Badge` (never color alone). Token-only colors via `useXenitionTheme()`;
 * `loading` shows a token skeleton; `onPress` makes the whole card a button.
 */
function AlbumCardV4({ title, photoCount, dateText, coverUrl, isPrivate = false, variant = 'cover', loading = false, onPress, countLabel = 'photos', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const horizontal = variant === 'list';
    const compact = variant === 'compact';
    const coverHeight = compact ? 96 : 176;
    const containerStyle = [
        {
            flexDirection: horizontal ? 'row' : 'column',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            padding: tokens.spacing.sm,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading album", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: horizontal ? 88 : '100%',
                        height: horizontal ? 88 : coverHeight,
                        borderRadius: tokens.radius.md,
                        backgroundColor: tokens.ramps.neutral[200],
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm, justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    // The matted photo: the cover sits inside a thin inset mat ring.
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: horizontal ? 88 : '100%',
            height: horizontal ? 88 : coverHeight,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: tokens.ramps.neutral[100],
            alignItems: 'center',
            justifyContent: 'center',
        }, children: coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverUrl }, accessible: true, accessibilityLabel: title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83D\uDDBC" })) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, justifyContent: horizontal ? 'center' : 'flex-start' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), isPrivate ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "warn", variant: "soft", size: "sm", children: "Private" })) : null] }), typeof photoCount === 'number' || dateText ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }, children: [typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs }, children: "\uD83D\uDDBC" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [photoCount, " ", countLabel] })] })) : null, dateText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: dateText })) : null] })) : null] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}${typeof photoCount === 'number' ? `, ${photoCount} ${countLabel}` : ''}${isPrivate ? ', private' : ''}`, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=AlbumCardV4.js.map