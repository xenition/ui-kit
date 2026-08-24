"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumCardV3 = AlbumCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
/** Square cover thumb edge for the row layout. */
const THUMB = 72;
/**
 * AlbumCard — design variant **V3**: a **horizontal cover-left row**. A compact
 * square cover sits flush on the left with the title, count and date stacked in
 * a right column and a chevron affordance trailing when tappable — a tight list
 * row rather than a card, so it packs densely in a scrolling album list. Private
 * albums keep the labelled `Badge`. Same props as {@link AlbumCardProps};
 * token-only, guarded, with a loading skeleton.
 */
function AlbumCardV3({ title, photoCount, dateText, coverUrl, isPrivate = false, loading = false, onPress, countLabel = 'photos', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading album", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: THUMB,
                        height: THUMB,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: tokens.ramps.neutral[200],
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 13, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 11, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const metaBits = [];
    if (typeof photoCount === 'number')
        metaBits.push(`${photoCount} ${countLabel}`);
    if (dateText)
        metaBits.push(dateText);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: THUMB,
                    height: THUMB,
                    borderRadius: tokens.radius.sm,
                    overflow: 'hidden',
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverUrl }, accessible: !onPress, accessibilityLabel: onPress ? undefined : title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), isPrivate ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "warn", variant: "soft", size: "sm", children: "Private" })) : null] }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaBits.join(' · ') })) : null] }), onPress ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u203A", size: "lg", color: "muted" }) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}${typeof photoCount === 'number' ? `, ${photoCount} ${countLabel}` : ''}${isPrivate ? ', private' : ''}`, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=AlbumCardV3.js.map