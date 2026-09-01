"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerProfileHeader = PlayerProfileHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const broadcast_1 = require("./internal/broadcast");
/**
 * PlayerProfileHeader — a **gradient player hero**. A brand-gradient ground with
 * the player's crest/photo avatar and big jersey number up top, the near-white
 * name + position · team beneath, an optional follow CTA, and a row of frosted
 * stat tiles (`broadcastTile` + `broadcastBorder`) along the bottom.
 * Presentational only: shaped `stats` plus an optional `onFollow`; nothing
 * fetches. Token-only colors via `useXenitionTheme()` + `broadcast*(tokens.ramps)`
 * — no literals, dark-safe.
 */
function PlayerProfileHeader({ name, position, team, number, photoUrl, crest, stats, onFollow, following = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, broadcast_1.broadcastInk)(r);
    const inkSoft = (0, broadcast_1.broadcastInkSoft)(r);
    const subtitle = [position, team].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, broadcast_1.broadcastGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `${name} avatar`, style: {
                                width: 64,
                                height: 64,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                backgroundColor: (0, broadcast_1.broadcastTile)(r),
                                borderWidth: 1,
                                borderColor: (0, broadcast_1.broadcastBorder)(r),
                            }, children: photoUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: photoUrl }, style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: crest ?? '🧑' })) }), number !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: `Jersey number ${number}`, style: {
                                marginLeft: 'auto',
                                color: ink,
                                fontSize: tokens.typography.scale['3xl'] * 1.3,
                                fontWeight: '800',
                                letterSpacing: -1,
                            }, children: number })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', marginTop: tokens.spacing.md }, children: name }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600', marginTop: 2 }, children: subtitle })) : null, onFollow ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: following ? `Unfollow ${name}` : `Follow ${name}`, accessibilityState: { selected: following }, onPress: onFollow, style: ({ pressed }) => ({
                        alignSelf: 'flex-start',
                        minHeight: 44,
                        justifyContent: 'center',
                        paddingHorizontal: tokens.spacing.lg,
                        borderRadius: tokens.radius.full,
                        marginTop: tokens.spacing.md,
                        backgroundColor: following ? (0, broadcast_1.broadcastTile)(r) : ink,
                        borderWidth: following ? 1 : 0,
                        borderColor: (0, broadcast_1.broadcastBorder)(r),
                        opacity: pressed ? 0.9 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: following ? ink : colors.primary,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '800',
                        }, children: following ? 'Following' : 'Follow' }) })) : null, stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flex: 1,
                            alignItems: 'center',
                            gap: 2,
                            paddingVertical: tokens.spacing.md,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, broadcast_1.broadcastTile)(r),
                            borderWidth: 1,
                            borderColor: (0, broadcast_1.broadcastBorder)(r),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: s.label })] }, `${s.label}-${i}`))) })) : null] }) }));
}
//# sourceMappingURL=PlayerProfileHeader.js.map