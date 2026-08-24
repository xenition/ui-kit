"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionCard = AdoptionCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    available: { label: 'Available', tone: 'success', slot: 'success' },
    pending: { label: 'Pending', tone: 'warn', slot: 'warn' },
    adopted: { label: 'Adopted', tone: 'neutral', slot: 'muted' },
    fostered: { label: 'In foster', tone: 'accent', slot: 'accent' },
};
/**
 * An adoption listing card: photo banner (or emoji placeholder), name + breed,
 * age/sex meta, shelter, a status chip, an optional fee, and adopt + favorite
 * actions. Whole card is pressable when `onPress` is set. Availability reads via
 * a labelled chip (not color alone). Token-only colors; a `View` placeholder
 * stands in for the pet photo.
 */
function AdoptionCard({ name, breed, age, sex, shelter, photoUrl, glyph = '🐾', fee, status, favorited = false, applyLabel = 'Apply to adopt', onApply, onFavorite, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const statusMeta = STATUS_META[status];
    const meta = [age, sex, breed].filter(Boolean).join(' · ');
    const showApply = onApply != null && status !== 'adopted';
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { height: 120, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }, children: [!photoUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: glyph })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "solid", size: "sm", children: statusMeta.label }) }), onFavorite ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: favorited }, accessibilityLabel: favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`, onPress: onFavorite, style: {
                            position: 'absolute',
                            top: tokens.spacing.sm,
                            right: tokens.spacing.sm,
                            width: 32,
                            height: 32,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.surface,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.base }, children: favorited ? '♥' : '♡' }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null, shelter ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", shelter] })) : null, fee || showApply ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [fee ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: fee })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), showApply ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onApply, children: applyLabel })) : null] })) : null] })] }));
    const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=AdoptionCard.js.map