"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityCard = EntityCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Eyebrow_1 = require("../primitives/Eyebrow");
const GenerativeCover_1 = require("../commerce/GenerativeCover");
/**
 * A generic content/entity card — the native mirror of the web marketing
 * `EntityCard`, collapsing the templates' bespoke `PostCard` / `ServiceCard` /
 * `SpeakerCard` / `ListingCard` / `ProgramCard` into props. Composes the native
 * `Card` with an inset media frame (an `Image` when `media.imageUrl` is set,
 * else a seeded {@link GenerativeCover}), an optional `Eyebrow`, the `title`
 * heading, an optional `description`, a `meta` line, an optional corner `badge`,
 * and a `footer` slot. `onPress` is native's `href`. Token-only.
 */
function EntityCard({ title, eyebrow, description, meta, media, badge, footer, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const mediaBox = media ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            aspectRatio: media.aspect ?? 1.6,
            width: '100%',
            overflow: 'hidden',
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.ramps.neutral[100],
        }, children: media.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: media.imageUrl }, accessible: true, accessibilityLabel: title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: media.seed ?? title, label: title, style: { width: '100%', height: '100%' } })) })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(Card_1.Card, { style: [{ gap: tokens.spacing.sm }, style], children: [badge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-entity-badge", style: {
                    position: 'absolute',
                    right: tokens.spacing.md,
                    top: tokens.spacing.md,
                    zIndex: 10,
                }, children: badge })) : null, mediaBox, eyebrow ? (0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { children: eyebrow }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '600',
                }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { testID: "xen-entity-meta", style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: meta })) : null, footer ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: footer }) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
    }
    return body;
}
//# sourceMappingURL=EntityCard.js.map