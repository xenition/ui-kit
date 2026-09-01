"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryHeaderV4 = GalleryHeaderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const studio_1 = require("./internal/studio");
/**
 * GalleryHeader — **V4** "studio" design (native parity of the web V4). The
 * client-gallery masthead, and the **one reserved gradient moment** in the
 * photography studio line. The `hero` variant is image-forward: with a
 * `coverUrl` it lays near-white `studioInk` over a full-bleed cover photo
 * darkened by a bottom `studioScrim`; with no cover it falls back to the brand
 * `studioGradient` ground. The `compact` variant is a clean studio band (no
 * gradient) — bordered `surface`, a bold title, muted subtitle, and a neutral
 * count pill. The photo-count reads as a frosted `studioTile`/`studioBorder`
 * pill on the gradient; the title carries an accessibility `header` role.
 * Identical props/behavior to {@link GalleryHeaderProps}; token-only colors via
 * `useXenitionTheme()` + the studio ramp helpers, no literals.
 */
function GalleryHeaderV4({ title, subtitle, photoCount, coverUrl, variant = 'hero', actions, countLabel = 'photos', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const isHero = variant === 'hero';
    // ── compact: clean studio band, no gradient ────────────────────────────────
    if (!isHero) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                {
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.lg,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                },
                style,
            ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null, typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            marginTop: tokens.spacing.xs,
                            backgroundColor: r.neutral[100],
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                        }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [photoCount, " ", countLabel] }) })) : null, actions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }, children: actions })) : null] }) }));
    }
    // ── hero: the reserved gradient moment ─────────────────────────────────────
    const ink = (0, studio_1.studioInk)(r);
    const inkSoft = (0, studio_1.studioInkSoft)(r);
    const textBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '700', letterSpacing: -0.5 }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null, typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'flex-start',
                    marginTop: tokens.spacing.xs,
                    backgroundColor: (0, studio_1.studioTile)(r),
                    borderWidth: 1,
                    borderColor: (0, studio_1.studioBorder)(r),
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [photoCount, " ", countLabel] }) })) : null, actions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }, children: actions })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                minHeight: 200,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: r.neutral[200],
                justifyContent: 'flex-end',
            },
            style,
        ], children: [coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverUrl }, accessible: false, resizeMode: "cover", style: { ...absoluteFill } })) : ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, studio_1.studioGradient)(r), style: { ...absoluteFill } })), coverUrl ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, studio_1.studioScrim)(r), start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '66%' } })) : null, textBlock] }));
}
const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };
//# sourceMappingURL=GalleryHeaderV4.js.map