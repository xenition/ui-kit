"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoLikedYouRow = WhoLikedYouRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/**
 * Horizontal "who liked you" strip — the native likes row. Shows a scrollable
 * rail of liker avatars with a total count pill; when `locked` (a premium gate)
 * the faces sit behind a token scrim and the whole rail becomes an unlock CTA
 * instead of exposing identities. Handles loading and empty states. Colors are
 * token-derived via `withAlpha` — no literal colors. Lock state is announced in
 * the a11y label, never by color alone.
 */
function WhoLikedYouRow({ likers, total, locked = true, title = 'Liked you', onPressLiker, onUnlock, loading = false, emptyLabel = 'No likes yet — keep swiping!', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = likers ?? [];
    const count = total ?? list.length;
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginBottom: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.14),
                    borderRadius: tokens.radius.full,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: count }) })) : null] }));
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.border } }, i))) })] }));
    }
    if (count === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyLabel, style: {
                        borderRadius: tokens.radius.lg,
                        borderWidth: 1,
                        borderColor: colors.border,
                        padding: tokens.spacing.lg,
                        alignItems: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) })] }));
    }
    const tile = (liker, i) => {
        const label = locked
            ? `Locked like ${i + 1}`
            : `${liker.name ?? 'Someone'}${liker.superLiked ? ', super liked you' : ''}`;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled: locked && !onUnlock }, onPress: () => (locked ? onUnlock?.() : onPressLiker?.(liker.id)), style: { alignItems: 'center', width: 72, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: locked ? undefined : liker.photoUri, name: locked ? '?' : liker.name, size: "xl", ring: liker.superLiked }), locked ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.45),
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDD12" }) })) : null] }), !locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, maxWidth: 68 }, children: liker.name ?? 'Someone' })) : null] }, liker.id));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [header, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, paddingRight: tokens.spacing.md }, children: list.map(tile) }), locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Unlock to see who liked you, ${count} total`, onPress: onUnlock, style: ({ pressed }) => ({
                    marginTop: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                    paddingVertical: tokens.spacing.sm,
                    alignItems: 'center',
                    opacity: pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: ["See all ", count, " likes"] }) })) : null] }));
}
//# sourceMappingURL=WhoLikedYouRow.js.map