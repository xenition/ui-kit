"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumHeader = AlbumHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const media_1 = require("../media");
const GradientSurface_1 = require("./internal/GradientSurface");
const spotlight_1 = require("./internal/spotlight");
/**
 * AlbumHeader — the **V4 "spotlight"** gradient hero for an album / playlist
 * (native). The cover sits on a two-hue brand glow (accent → primary) beside a
 * big near-white title, an optional subtitle, `meta` facts as frosted chips, and
 * Play (a near-white pill) + Shuffle (a ghost button) CTAs. Token-only colors via
 * `useXenitionTheme()` + `spotlight*(tokens.ramps)` on `GradientSurface` — no
 * literals; dark-mode safe.
 */
function AlbumHeader({ title, subtitle, artworkUrl, meta, onPlay, onShuffle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, spotlight_1.spotlightInk)(r);
    const inkSoft = (0, spotlight_1.spotlightInkSoft)(r);
    const tile = (0, spotlight_1.spotlightTile)(r);
    const border = (0, spotlight_1.spotlightBorder)(r);
    const artItem = {
        url: artworkUrl ?? '',
        alt: subtitle ? `${title} — ${subtitle}` : title,
        width: 1,
        height: 1,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, spotlight_1.spotlightGlow)(r), style: {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.xl,
                gap: tokens.spacing.lg,
                overflow: 'hidden',
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        alignSelf: 'center',
                        width: '52%',
                        padding: tokens.spacing.xs,
                        borderRadius: tokens.radius.lg,
                        backgroundColor: tile,
                        borderWidth: 1,
                        borderColor: border,
                        overflow: 'hidden',
                    }, children: artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', borderRadius: tokens.radius.md, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(media_1.MediaFigure, { item: artItem, reserveAspect: true }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['3xl'] }, children: "\u266A" }) })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: ink, fontSize: tokens.typography.scale.xl * 1.15, fontWeight: '800', textAlign: 'center' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: subtitle })) : null] }), meta && meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.sm }, children: meta.map((fact, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: tile,
                            borderWidth: 1,
                            borderColor: border,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: fact }) }, i))) })) : null, onPlay || onShuffle ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.sm }, children: [onPlay ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Play", onPress: onPlay, style: ({ pressed }) => ({
                                minHeight: 44,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.xl,
                                paddingVertical: tokens.spacing.sm,
                                borderRadius: tokens.radius.full,
                                backgroundColor: ink,
                                opacity: pressed ? 0.9 : 1,
                            }), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25B6", size: "base", color: "primary" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "Play" })] })) : null, onShuffle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Shuffle", onPress: onShuffle, style: ({ pressed }) => ({
                                minHeight: 44,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.lg,
                                paddingVertical: tokens.spacing.sm,
                                borderRadius: tokens.radius.full,
                                backgroundColor: tile,
                                borderWidth: 1,
                                borderColor: border,
                                opacity: pressed ? 0.8 : 1,
                            }), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD00", size: "base", color: "onPrimary" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Shuffle" })] })) : null] })) : null] }) }));
}
//# sourceMappingURL=AlbumHeader.js.map