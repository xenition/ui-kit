"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionCardV4 = AdoptionCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    available: { label: 'Available', tone: 'success' },
    pending: { label: 'Pending', tone: 'warn' },
    adopted: { label: 'Adopted', tone: 'neutral' },
    fostered: { label: 'In foster', tone: 'accent' },
};
/**
 * AdoptionCard — **V4** "companion" design. The warm, friendly take on an
 * adoption listing: an elevated rounded card with a soft shadow, a photo banner
 * (or a big glyph in a soft-primary tinted well), a frosted favorite heart, a
 * labelled status chip, and the fee shown as a soft-primary chip beside a rounded
 * adopt CTA. Same props/behavior as {@link AdoptionCardProps}; availability reads
 * via a labelled chip (never color alone). Token-only colors via
 * `useXenitionTheme()`; the whole card is pressable when `onPress` is set.
 */
function AdoptionCardV4({ name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited = false, applyLabel = 'Apply to adopt', onApply, onFavorite, onPress, style, variant = 'cover', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const statusMeta = STATUS_META[status];
    const meta = [age, sex, breed].filter(Boolean).join(' · ');
    const showApply = onApply != null && status !== 'adopted';
    const shellStyle = [
        {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const statusBadge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "soft", size: "sm", children: statusMeta.label }));
    const feeChip = fee ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: fee }) })) : null;
    const applyButton = showApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onApply, children: applyLabel })) : null;
    const favoriteButton = (extra) => onFavorite ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: favorited }, accessibilityLabel: favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`, onPress: onFavorite, style: [
            {
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.9),
                alignItems: 'center',
                justifyContent: 'center',
            },
            extra,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }, children: favorited ? '♥' : '♡' }) })) : null;
    let inner;
    if (variant === 'list') {
        inner = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: shellStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, padding: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            width: 88,
                            height: 88,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: [photoUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: photoUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: glyph })), favoriteButton({ position: 'absolute', top: 2, right: 2, width: 36, height: 36 })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null, shelter ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", shelter] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { children: statusBadge }) }), fee || showApply ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [feeChip ?? (0, jsx_runtime_1.jsx)(react_native_1.View, {}), applyButton] })) : null] })] }) }));
    }
    else if (variant === 'compact') {
        inner = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: shellStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), statusBadge, feeChip, favoriteButton(undefined)] }) }));
    }
    else {
        inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: shellStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { height: 132, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), alignItems: 'center', justifyContent: 'center' }, children: [photoUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: photoUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: glyph })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "soft", size: "sm", children: statusMeta.label }) }), onFavorite ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: favorited }, accessibilityLabel: favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`, onPress: onFavorite, style: {
                                position: 'absolute',
                                top: tokens.spacing.sm,
                                right: tokens.spacing.sm,
                                width: 36,
                                height: 36,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.9),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }, children: favorited ? '♥' : '♡' }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null, shelter ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", shelter] })) : null, fee || showApply ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [fee ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: fee }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), showApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onApply, children: applyLabel })) : null] })) : null] })] }));
    }
    const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=AdoptionCardV4.js.map