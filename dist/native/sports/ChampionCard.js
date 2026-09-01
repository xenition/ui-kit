"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChampionCard = ChampionCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const broadcast_1 = require("./internal/broadcast");
/**
 * ChampionCard — the sports module's **peak-end trophy celebration**. A two-hue
 * accent→primary "trophy glow" gradient ground (`broadcastTrophy`) with a big 🏆
 * glyph, the optional competition subtitle, the celebration `title`, and the
 * winning `team` (crest + name) all in near-white ink, plus an optional frosted
 * stat tile and a share CTA. Presentational only: shaped data plus an optional
 * `onShare`; nothing fetches. Token-only colors via `useXenitionTheme()` +
 * `broadcast*(tokens.ramps)` — no literals, dark-safe.
 */
function ChampionCard({ title, team, crest, subtitle, stat, onShare, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, broadcast_1.broadcastInk)(r);
    const inkSoft = (0, broadcast_1.broadcastInkSoft)(r);
    const a11y = `${title}${subtitle ? `, ${subtitle}` : ''}, ${team}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, broadcast_1.broadcastTrophy)(r), style: {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                overflow: 'hidden',
                alignItems: 'center',
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: "Trophy", style: {
                        width: 80,
                        height: 80,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, broadcast_1.broadcastTile)(r),
                        borderWidth: 1,
                        borderColor: (0, broadcast_1.broadcastBorder)(r),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: "\uD83C\uDFC6" }) }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: inkSoft,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '800',
                        letterSpacing: 0.5,
                        marginTop: tokens.spacing.md,
                    }, children: subtitle.toUpperCase() })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', marginTop: tokens.spacing.xs, textAlign: 'center' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: team })] }), stat ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        minWidth: 128,
                        alignItems: 'center',
                        gap: 2,
                        paddingVertical: tokens.spacing.md,
                        paddingHorizontal: tokens.spacing.lg,
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, broadcast_1.broadcastTile)(r),
                        borderWidth: 1,
                        borderColor: (0, broadcast_1.broadcastBorder)(r),
                        marginTop: tokens.spacing.lg,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: stat.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stat.label })] })) : null, onShare ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Share", onPress: onShare, style: ({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        minHeight: 44,
                        justifyContent: 'center',
                        paddingHorizontal: tokens.spacing.lg,
                        borderRadius: tokens.radius.full,
                        backgroundColor: ink,
                        marginTop: tokens.spacing.lg,
                        opacity: pressed ? 0.9 : 1,
                    }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: "\u2197" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: "Share" })] })) : null] }) }));
}
//# sourceMappingURL=ChampionCard.js.map