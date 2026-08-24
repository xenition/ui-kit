"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryHeader = GalleryHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Token-derived translucent tint (no literal hex). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * The masthead for a client gallery — a title with an optional subtitle, a
 * photo-count meta pill, and an `actions` slot. The `hero` variant lays the
 * text over a full-bleed cover image (with a token scrim for legibility); the
 * `compact` variant is a plain titled band. The title is an accessibility
 * `header`. Token-only — the scrim and surfaces trace to theme tokens.
 */
function GalleryHeader({ title, subtitle, photoCount, coverUrl, variant = 'hero', actions, countLabel = 'photos', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isHero = variant === 'hero' && Boolean(coverUrl);
    const titleColor = isHero ? colors.onAccent : colors.onSurface;
    const subColor = isHero ? colors.onAccent : colors.muted;
    const textBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: titleColor,
                    fontSize: tokens.typography.scale['2xl'],
                    fontWeight: '700',
                }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subColor, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null, typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'flex-start',
                    marginTop: tokens.spacing.xs,
                    backgroundColor: isHero ? withAlpha(colors.onSurface, 0.35) : tokens.ramps.neutral[100],
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                        color: isHero ? colors.onAccent : colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '600',
                    }, children: [photoCount, " ", countLabel] }) })) : null, actions ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }, children: actions })) : null] }));
    if (isHero) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    height: 200,
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    backgroundColor: tokens.ramps.neutral[200],
                    justifyContent: 'flex-end',
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverUrl }, accessible: false, resizeMode: "cover", style: { position: 'absolute', width: '100%', height: '100%' } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        backgroundColor: withAlpha(colors.onSurface, 0.4),
                        padding: tokens.spacing.lg,
                    }, children: textBlock })] }));
    }
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
        ], children: textBlock }));
}
//# sourceMappingURL=GalleryHeader.js.map