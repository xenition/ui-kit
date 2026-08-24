"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionCardV2 = AdoptionCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const STATUS_META = {
    available: { label: 'Available', tone: 'success', slot: 'success' },
    pending: { label: 'Pending', tone: 'warn', slot: 'warn' },
    adopted: { label: 'Adopted', tone: 'neutral', slot: 'muted' },
    fostered: { label: 'In foster', tone: 'accent', slot: 'accent' },
};
/**
 * Full-bleed photo hero — an immersive alternate to {@link AdoptionCard}. The
 * pet photo (or an emoji placeholder) fills a tall banner; the status chip and a
 * favorite heart float over the top, while the name, meta, fee and an apply CTA
 * sit on a bottom scrim. Text over the scrim uses light neutral-ramp tokens for
 * a consistent dark-photo overlay. Same `AdoptionCardProps`. Token-pure.
 */
function AdoptionCardV2({ name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited = false, applyLabel = 'Apply to adopt', onApply, onFavorite, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const statusMeta = STATUS_META[status];
    const meta = [age, sex, breed].filter(Boolean).join(' · ');
    const showApply = onApply != null && status !== 'adopted';
    // Fixed light-on-dark overlay palette, sourced from the neutral ramp (tokens).
    const onScrim = tokens.ramps.neutral[50] ?? colors.surface;
    const onScrimMuted = tokens.ramps.neutral[200] ?? tokens.ramps.neutral[100] ?? colors.muted;
    const scrim = (0, color_1.withAlpha)(tokens.ramps.neutral[900] ?? '#000000', 0.55);
    const inner = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: 220, backgroundColor: tokens.ramps.neutral[100] ?? colors.border, alignItems: 'center', justifyContent: 'center' }, children: [!photoUrl ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: 64 }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "solid", size: "sm", children: statusMeta.label }) }), onFavorite ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: favorited }, accessibilityLabel: favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`, onPress: onFavorite, style: {
                        position: 'absolute',
                        top: tokens.spacing.sm,
                        right: tokens.spacing.sm,
                        width: 36,
                        height: 36,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.surface,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }, children: favorited ? '♥' : '♡' }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: tokens.spacing.lg,
                        backgroundColor: scrim,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: onScrim, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: onScrimMuted, fontSize: tokens.typography.scale.sm }, children: meta })) : null, shelter ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: onScrimMuted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", shelter] })) : null, fee ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onScrim, fontSize: tokens.typography.scale.base, fontWeight: '700', marginTop: 2 }, children: fee })) : null] }), showApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onApply, children: applyLabel })) : null] })] }) }));
    const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.92 : 1 }), children: inner }) }));
}
//# sourceMappingURL=AdoptionCardV2.js.map